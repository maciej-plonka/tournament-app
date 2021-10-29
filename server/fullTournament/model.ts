import {Match, Team} from "@prisma/client";

export interface FullTournament {
    id: number,
    title: string,
    finalMatch: MatchTreeNode
}

export interface MatchTreeNode {
    id: number,
    teams: Team[]
    winnerId: number | null
    previousMatches: ReadonlyArray<MatchTreeNode>
}

export interface MatchWithTeams extends Match {
    teams: Team[]
    winnerId: number | null
}
