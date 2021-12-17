import {Match, MatchParticipant, Player, PrismaClient, Team, TeamMember, Tournament} from ".prisma/client";
import type {Repository} from "./repository";
import type {MatchWithParticipants, MatchWithTeams} from "./model";

class PrismaRepository implements Repository {
    constructor(private readonly prisma: PrismaClient) {
    }

    createMatch(tournamentId: number, nextMatchId: number | null): Promise<Match> {
        return this.prisma.match.create({
            data: {
                tournamentId,
                nextMatchId
            }
        })
    }

    createMatchParticipant(matchId: number, teamId: number, winner?: boolean): Promise<MatchParticipant> {
        return this.prisma.matchParticipant.create({
            data: {
                matchId,
                teamId,
                winner
            }
        })
    }

    createTeam(name: string): Promise<Team> {
        return this.prisma.team.create({
            data: {
                name
            }
        })
    }

    updateMatchParticipant(participant: MatchParticipant): Promise<unknown> {
        return this.prisma.matchParticipant.update({
            where: {
                id: participant.id
            },
            data: participant
        })
    }

    createTeamMember(teamId: number, playerId: number): Promise<TeamMember> {
        return this.prisma.teamMember.create({
            data: {
                teamId,
                playerId
            }
        })
    }

    createTournament(title: string): Promise<Tournament> {
        return this.prisma.tournament.create({
            data: {title}
        })
    }

    getAllMatchesWithParticipatingTeamsInTournament(tournamentId: number): Promise<ReadonlyArray<MatchWithTeams>> {
        return this.prisma.match.findMany({
            where: {
                tournamentId: tournamentId,
            },
            include: {
                participants: {
                    include: {
                        team: true
                    },
                    orderBy: {
                        id: 'asc'
                    }
                }
            },
        })
    }

    getAllTournaments(): Promise<ReadonlyArray<Tournament>> {
        return this.prisma.tournament.findMany()
    }

    getMatchWithParticipantsById(id: number): Promise<MatchWithParticipants | null> {
        return this.prisma.match.findFirst({
            where: {
                id
            },
            include: {
                participants: true
            }
        })
    }

    getTournamentById(id: number): Promise<Tournament | null> {
        return this.prisma.tournament.findFirst({
            where: {
                id: id
            }
        })
    }

    getAllPlayers(): Promise<ReadonlyArray<Player>> {
        return this.prisma.player.findMany()
    }

    createPlayer(name: string, login: string, password: string): Promise<Player> {
        return this.prisma.player.create({
            data: {
                name,
                login,
                password
            }
        })
    }

    findPlayerByLogin(login: string): Promise<Player | null> {
        return this.prisma.player.findFirst({
            where: {
                login
            }
        })
    }

}

export function createRepository(prisma: PrismaClient): Repository {
    return new PrismaRepository(prisma)
}
