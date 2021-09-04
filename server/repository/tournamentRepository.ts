import {Tournament} from "@prisma/client";
import {prisma} from "./prisma";

export async function getTournamentById(id: number): Promise<Tournament | null> {
    return prisma.tournament.findFirst({
        where: {
            id: id
        }
    })
}

export async function getAllTournaments(): Promise<ReadonlyArray<Tournament>> {
    return prisma.tournament.findMany()
}


export async function createTournament(title: string): Promise<Tournament> {
    return prisma.tournament.create({
        data: {title}
    })
}
