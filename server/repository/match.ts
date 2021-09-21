import {Match, MatchParticipant} from "@prisma/client";
import {prisma} from "./prisma";

export async function getMatchWithParticipantsById(id: number) {
    return prisma.match.findFirst({
        where: {
            id
        },
        include: {
            participants: true
        }
    })
}

export async function createMatch(tournamentId: number, nextMatchId: number | null): Promise<Match> {
    return prisma.match.create({
        data: {
            tournamentId,
            nextMatchId
        }
    })
}

export async function createMatchParticipant(matchId: number, teamId: number, winner: boolean = false): Promise<MatchParticipant> {
    return prisma.matchParticipant.create({
        data: {
            matchId,
            teamId,
            winner
        }
    })
}

export async function saveMatchParticipant(participant: MatchParticipant) {
    return prisma.matchParticipant.update({
        where: {
            id: participant.id
        },
        data: participant
    })
}

export async function getAllMatchesWithParticipatingTeamsInTournament(tournamentId: number) {
    return await prisma.match.findMany({
        where: {
            tournamentId: tournamentId,
        },
        include: {
            participants: {
                include: {
                    team: true
                }
            }
        }
    })
}