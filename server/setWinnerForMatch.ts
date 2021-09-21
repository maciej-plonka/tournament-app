import {getMatchWithParticipantsById, saveMatchParticipant} from "./repository";
import {SetMatchWinner} from "../shared/match/commands";


export async function setWinnerForMatch({matchId, teamId}: SetMatchWinner): Promise<any> {
    const match = await getMatchWithParticipantsById(matchId)
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
    await saveMatchParticipant({
        ...winningParticipant,
        winner: true
    })
}
