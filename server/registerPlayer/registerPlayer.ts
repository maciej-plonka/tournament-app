import {Player} from ".prisma/client";
import bcrypt from "bcrypt";
import {Repository} from "../repository";

export type NewPlayer = {
    login: string,
    name: string,
    password: string,
}

export async function registerPlayer(repository: Repository, newPlayer: NewPlayer): Promise<Player> {
    const {name, password, login} = newPlayer
    const foundPlayer = await repository.findPlayerByLogin(login)
    if (foundPlayer) {
        throw new Error("Player already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return repository.createPlayer(name, login, hashedPassword);
}
