import {Player, Team} from ".prisma/client";
import {randomizeArray} from "../utils/randomizeArray";
import {createBatches} from "../utils/createBatches";
import {sortByKey} from "../utils/sort";
import {createTeam, createTeamMember} from "./repository";

export async function createRandomTeams(players: ReadonlyArray<Player>, teamSize: number): Promise<Team[]> {
    const randomizedPlayers = randomizeArray(players)
    const batchedPlayers = createBatches(randomizedPlayers, teamSize);
    return Promise.all(batchedPlayers.map(createTeamForPlayers))
}

async function createTeamForPlayers(players: ReadonlyArray<Player>): Promise<Team> {
    const name = sortByKey(players, "id").map(it => it.name).join(' ');
    const team = await createTeam(name);
    await Promise.all(players.map(player => createTeamMember(team.id, player.id)));
    return team;
}
