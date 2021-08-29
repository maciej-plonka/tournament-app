import {Tournament} from "@prisma/client";

export type CreateTournamentResponse = { type: 'error', message: string }
    | { type: 'success', tournament: Tournament }
