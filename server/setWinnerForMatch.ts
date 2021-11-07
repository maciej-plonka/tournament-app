import {SetMatchWinner} from "../shared/match/commands";
import {Repository} from "./repository";


export async function setWinnerForMatch(repository: Repository, setMatchWinner: SetMatchWinner): Promise<any> {
    const {matchId, teamId} = setMatchWinner
    const match = await repository.getMatchWithParticipantsById(matchId)
    if (!match) {
        throw new Error(`match with id: ${matchId} not found`)
    }
    if (match.participants.some(it => it.winner)) {
        throw new Error("Match already has a winning team")
    }

    const winningParticipant = match.participants.find(it => it.teamId === teamId)
    if (!winningParticipant) {
        throw new Error(`Winning team is not part of the match`)
    }
    await repository.updateMatchParticipant({
        ...winningParticipant,
        winner: true
    })

    if (match.nextMatchId) {
        await repository.createMatchParticipant(match.nextMatchId, teamId);
    }
}
