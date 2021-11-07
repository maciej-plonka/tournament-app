import {Player, Tournament} from ".prisma/client";
import {createRandomTeams} from "./createRandomTeams";
import {createTournament} from "./createTournament";
import {Repository} from "../repository";

export type NewRandomTournament = {
    title: string,
    players: ReadonlyArray<Player>,
    teamSize: number
}

export async function createRandomTournament(repository: Repository, newTournament: NewRandomTournament): Promise<Tournament> {
    const {title, players, teamSize} = newTournament
    const teams = await createRandomTeams(repository, players, teamSize);
    return createTournament(repository, title, teams);
}
