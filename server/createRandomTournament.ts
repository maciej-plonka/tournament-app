import {Match, Player, Team, Tournament} from "@prisma/client";
import {createBatches} from "../utils/createBatches";
import {randomizeArray} from "../utils/randomizeArray";
import {sortBy} from "../utils/sortBy";
import {createMatch, createMatchParticipant, createTeam, createTeamMember, createTournament} from "./repository";

export async function createRandomTournament(title: string, players: ReadonlyArray<Player>, teamSize: number): Promise<Tournament> {
    const savedTournament = await createTournament(title)
    const lastMatches = await createMatchTree(savedTournament, players.length / teamSize)
    const randomizedPlayers = randomizeArray(players)
    const batchedPlayers = createBatches(randomizedPlayers, teamSize);

    await Promise.all(lastMatches.map((match, index) => {
        const teamOnePlayers = batchedPlayers[index * 2]
        const teamTwoPlayers = batchedPlayers[index * 2 + 1]
        return createTeamsAndAssignItToMatch(match, teamOnePlayers, teamTwoPlayers)
    }))
    return savedTournament
}

async function createTeamsAndAssignItToMatch(match: Match, teamOnePlayers: ReadonlyArray<Player>, teamTwoPlayers: ReadonlyArray<Player>): Promise<any> {
    return Promise.all([
        createTeamForPlayers(teamOnePlayers).then(team => createMatchParticipant(match.id, team.id)),
        createTeamForPlayers(teamTwoPlayers).then(team => createMatchParticipant(match.id, team.id)),
    ])
}

async function createTeamForPlayers(players: ReadonlyArray<Player>): Promise<Team> {
    const name = sortBy(players, player => player.id).map(it => it.name).join(' ');
    const team = await createTeam(name);
    await Promise.all(players.map(player => createTeamMember(team.id, player.id)));
    return team;
}

const TEAM_PER_MATCH = 2;

async function createMatchTree(tournament: Tournament, teamCount: number): Promise<Match[]> {
    const targetMatchesInRow = Math.max(1, teamCount / TEAM_PER_MATCH);
    let currentMatchesInRow = 1;
    let lastRow: Match[] = [];
    while (currentMatchesInRow <= targetMatchesInRow) {
        const currentRowPromises: Promise<Match>[] = [];
        for (let matchNumber = 0; matchNumber < currentMatchesInRow; matchNumber++) {
            const nextMatchId = lastRow[Math.floor(matchNumber / TEAM_PER_MATCH)]?.id
            currentRowPromises.push(createMatch(tournament.id, nextMatchId));
        }
        lastRow = await Promise.all(currentRowPromises)
        currentMatchesInRow *= TEAM_PER_MATCH;
    }
    return lastRow;

}
