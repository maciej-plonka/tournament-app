import {Player, Team} from ".prisma/client";
import {randomizeArray} from "../../utils/randomizeArray";
import {createBatches} from "../../utils/createBatches";
import {sortByKey} from "../../utils/sort";
import {Repository} from "../repository";

export async function createRandomTeams(repository: Repository, players: ReadonlyArray<Player>, teamSize: number): Promise<Team[]> {
    const randomizedPlayers = randomizeArray(players)
    const batchedPlayers = createBatches(randomizedPlayers, teamSize);
    return Promise.all(batchedPlayers.map(players => createTeamForPlayers(repository, players)))
}

async function createTeamForPlayers(repository: Repository, players: ReadonlyArray<Player>): Promise<Team> {
    const name = sortByKey(players, "id").map(it => it.name).join(' ');
    const team = await repository.createTeam(name);
    await Promise.all(players.map(player => repository.createTeamMember(team.id, player.id)));
    return team;
}
