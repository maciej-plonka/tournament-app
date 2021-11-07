import {Match, Team, Tournament} from "@prisma/client";
import {Repository} from "../repository";

export async function createTournament(repository: Repository, title: string, teams: Team[]): Promise<Tournament> {
    const savedTournament = await repository.createTournament(title)
    const lastMatches = await createMatchTree(repository, savedTournament, teams.length)

    await Promise.all(lastMatches.map((match, index) => {
        const teamOne = teams[index * 2];
        const teamTwo = teams[index * 2 + 1];
        return Promise.all([
            repository.createMatchParticipant(match.id, teamOne.id),
            repository.createMatchParticipant(match.id, teamTwo.id)
        ])
    }))
    return savedTournament
}


const TEAM_PER_MATCH = 2;

async function createMatchTree(repository: Repository, tournament: Tournament, teamCount: number): Promise<Match[]> {
    const targetMatchesInRow = Math.max(1, teamCount / TEAM_PER_MATCH);
    let currentMatchesInRow = 1;
    let lastRow: Match[] = [];
    while (currentMatchesInRow <= targetMatchesInRow) {
        const currentRowPromises: Promise<Match>[] = [];
        for (let matchNumber = 0; matchNumber < currentMatchesInRow; matchNumber++) {
            const nextMatchId = lastRow[Math.floor(matchNumber / TEAM_PER_MATCH)]?.id
            currentRowPromises.push(repository.createMatch(tournament.id, nextMatchId));
        }
        lastRow = await Promise.all(currentRowPromises)
        currentMatchesInRow *= TEAM_PER_MATCH;
    }
    return lastRow;

}
