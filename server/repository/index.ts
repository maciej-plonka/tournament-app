import * as tournamentRepository from "./tournament"
import * as teamRepository from "./team"
import * as matchRepository from "./match"

export const repository = {
    ...tournamentRepository,
    ...teamRepository,
    ...matchRepository
}
