import {Player, Tournament} from ".prisma/client";
import {createRandomTeams} from "./createRandomTeams";
import {createTournament} from "./createTournament";

export async function createRandomTournament(title: string, players: ReadonlyArray<Player>, teamSize: number): Promise<Tournament> {
    const teams = await createRandomTeams(players, teamSize);
    return createTournament(title, teams);
}
