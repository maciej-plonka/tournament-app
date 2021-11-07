import {generateTree} from "./generateTree";
import {FullTournament, MatchWithTeams} from "./model";
import {Repository} from "../repository";


export async function prepareFullTournament(repository: Repository,tournamentId: number): Promise<FullTournament | undefined> {
    const tournament = await repository.getTournamentById(tournamentId);
    if (!tournament) {
        return
    }
    const matchesWithTeams = await prepareMatchesWithTeams(repository,tournamentId)
    return {
        id: tournamentId,
        title: tournament.title,
        finalMatch: generateTree(matchesWithTeams),
    }
}

async function prepareMatchesWithTeams(repository: Repository, tournamentId: number): Promise<ReadonlyArray<MatchWithTeams>> {
    const matches = await repository.getAllMatchesWithParticipatingTeamsInTournament(tournamentId)
    return matches.map(match => ({
        id: match.id,
        nextMatchId: match.nextMatchId,
        tournamentId: match.tournamentId,
        winnerId: match.participants.find(it => it.winner)?.teamId || null,
        teams: match.participants.map(it => it.team)
    }))
}
