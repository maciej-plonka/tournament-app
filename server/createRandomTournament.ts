import {Match, Player, Team, Tournament} from "@prisma/client";
import {prisma} from "./prisma";
import {createBatches} from "../utils/createBatches";
import {randomizeArray} from "../utils/randomizeArray";
import {sortBy} from "../utils/sortBy";

export async function createRandomTournament(title: string, players: ReadonlyArray<Player>, teamSize: number): Promise<Tournament> {
    const savedTournament = await prisma.tournament.create({data: {title}})
    const lastMatches = await createMatchTree(savedTournament, players.length / teamSize)
    const batchedPlayers = createBatches(randomizeArray(players), teamSize);

    await Promise.all(lastMatches.flatMap(
        async (match, index) => [
            createTeam(batchedPlayers[index * 2]).then(team => assignTeamToMatch(team, match)),
            createTeam(batchedPlayers[index * 2 + 1]).then(team => assignTeamToMatch(team, match)),
        ]
    ))
    return savedTournament
}

async function createTeam(players: ReadonlyArray<Player>): Promise<Team> {
    const name = sortBy(players, player => player.id).map(it => it.name).join(' ');
    const team = await prisma.team.create({data: {name}})
    await Promise.all(players.map(async player => prisma.teamMember.create({
        data: {
            teamId: team.id,
            playerId: player.id
        }
    })));
    return team;
}

async function assignTeamToMatch(team: Team, match: Match) {
    return prisma.matchParticipant.create({
        data: {
            teamId: team.id,
            matchId: match.id
        }
    })
}

const TEAM_PER_MATCH = 2;

async function createMatchTree(tournament: Tournament, teamCount: number): Promise<Match[]> {
    const targetMatchesInRow = Math.max(1, teamCount / TEAM_PER_MATCH);
    let currentMatchesInRow = 1;
    let lastRow: Match[] = [];
    while (currentMatchesInRow <= targetMatchesInRow) {
        const currentRow: Promise<Match>[] = [];
        for (let matchNumber = 0; matchNumber < currentMatchesInRow; matchNumber++) {
            const newMatchPromise = prisma.match.create({
                data: {
                    nextMatchId: lastRow[Math.floor(matchNumber / TEAM_PER_MATCH)]?.id,
                    tournamentId: tournament.id
                }
            })
            currentRow.push(newMatchPromise);
        }
        lastRow = await Promise.all(currentRow)
        currentMatchesInRow *= TEAM_PER_MATCH;
    }
    return lastRow;

}
