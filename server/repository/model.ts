import {Match, MatchParticipant, Team} from ".prisma/client";

type ParticipantWithTeam = MatchParticipant & { team: Team }
export type MatchWithTeams = Match & { participants: ReadonlyArray<ParticipantWithTeam> }

export type MatchWithParticipants = Match & { participants: ReadonlyArray<MatchParticipant> }
