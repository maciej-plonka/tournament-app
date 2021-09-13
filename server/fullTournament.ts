import {generateTree, MatchTreeNode, MatchWithTeams} from "./matchTree";
import {getAllMatchesWithParticipatingTeamsInTournament, getTournamentById} from "./repository";

export interface FullTournament {
    id: number,
    title: string,
    finalMatch: MatchTreeNode
}

async function prepareMatchesWithTeams(tournamentId: number): Promise<ReadonlyArray<MatchWithTeams>> {
    const matches = await getAllMatchesWithParticipatingTeamsInTournament(tournamentId)
    return matches.map(match => ({
        id: match.id,
        nextMatchId: match.nextMatchId,
        tournamentId: match.tournamentId,
        winnerId: match.participants.find(it => it.winner)?.teamId || null,
        teams: match.participants.map(it => it.team)
    }))
}

export async function prepareFullTournament(tournamentId: number): Promise<FullTournament | undefined> {
    const tournament = await getTournamentById(tournamentId);
    if (!tournament) {
        return
    }
    const matchesWithTeams = await prepareMatchesWithTeams(tournamentId)
    return {
        id: tournamentId,
        title: tournament.title,
        finalMatch: generateTree(matchesWithTeams),
    }
}
