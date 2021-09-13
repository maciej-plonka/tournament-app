import {Team, TeamMember} from "@prisma/client";
import {prisma} from "./prisma";

export async function createTeam(name: string): Promise<Team> {
    return prisma.team.create({
        data: {
            name
        }
    })
}

export async function createTeamMember(teamId: number, playerId: number): Promise<TeamMember> {
    return prisma.teamMember.create({
        data: {
            teamId,
            playerId
        }
    })
}
