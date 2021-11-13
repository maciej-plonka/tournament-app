import type {Match, Team, Tournament} from "@prisma/client";
import type {Repository} from "../repository";

export type NewTournament = {
    title: string,
    teams: ReadonlyArray<Team>
}

export async function createTournament(repository: Repository, newTournament: NewTournament): Promise<Tournament> {
    const {title, teams} = newTournament
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


const TEAMS_PER_MATCH = 2;

async function createMatchTree(repository: Repository, tournament: Tournament, teamCount: number): Promise<Match[]> {
    const targetMatchesInRow = Math.max(1, teamCount / TEAMS_PER_MATCH);
    let lastRow: Match[] = [];
    for (let currentMatchesInRow = 1; currentMatchesInRow <= targetMatchesInRow; currentMatchesInRow *= TEAMS_PER_MATCH) {
        const currentRowPromises: Promise<Match>[] = [];
        for (let matchNumber = 0; matchNumber < currentMatchesInRow; matchNumber++) {
            const nextMatchIndex = Math.floor(matchNumber / TEAMS_PER_MATCH)
            const nextMatchId = lastRow[nextMatchIndex]?.id
            currentRowPromises.push(repository.createMatch(tournament.id, nextMatchId));
        }
        lastRow = await Promise.all(currentRowPromises)
    }
    return lastRow;

}
