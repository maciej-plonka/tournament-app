import {MatchWithParticipants, MatchWithTeams} from "./model";
import {Match, Player} from ".prisma/client";
import {MatchParticipant, Team, TeamMember, Tournament} from "@prisma/client";

export interface Repository {
    getMatchWithParticipantsById(id: number): Promise<MatchWithParticipants | null>

    createMatch(tournamentId: number, nextMatchId: number | null): Promise<Match>

    createMatchParticipant(matchId: number, teamId: number, winner?: boolean): Promise<MatchParticipant>

    updateMatchParticipant(participant: MatchParticipant): Promise<unknown>

    getAllMatchesWithParticipatingTeamsInTournament(tournamentId: number): Promise<ReadonlyArray<MatchWithTeams>>

    createTeam(name: string): Promise<Team>

    createTeamMember(teamId: number, playerId: number): Promise<TeamMember>

    getTournamentById(id: number): Promise<Tournament | null>

    getAllTournaments(): Promise<ReadonlyArray<Tournament>>

    createTournament(title: string): Promise<Tournament>

    getAllPlayers(): Promise<ReadonlyArray<Player>>
}

