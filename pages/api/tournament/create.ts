import {Match, Player, Team, Tournament} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../server/prisma";
import {isTitleValid, isValidNumberOfPlayers} from "../../../shared/tournament/validators";
import {randomizeArray} from "../../../utils/randomizeArray";
import {createBatches} from "../../../utils/createBatches";
import {createRandomTournament} from "../../../server/createRandomTournament";
import {CreateTournamentResponse} from "../../../shared/tournament/responses";

interface ErrorMessage {
    message: string
}

interface CreateTournament {
    title: string,
    players: ReadonlyArray<Player>,
    teamSize: number
}

export default async function createTournament(req: NextApiRequest, res: NextApiResponse<CreateTournamentResponse>) {
    if (req.method !== 'POST') {
        return res.status(405).json({type: 'error', message: "Method not allowed"});
    }
    const createTournament = req.body as CreateTournament
    const validationError = validateCreateTournament(createTournament);
    if (validationError) {
        return res.status(400).json({type: 'error', message: validationError})
    }
    const {title, players, teamSize} = createTournament;
    const tournament = await createRandomTournament(title, players, teamSize)
    return res.status(200).json({type: 'success', tournament})
}


function validateCreateTournament({title, players, teamSize}: CreateTournament): string | undefined {
    if (!isTitleValid(title)) {
        return "Title is not valid"
    }
    if (!isValidNumberOfPlayers(players?.length ?? 0)) {
        return "Number of selected players is not valid"
    }
    if (!teamSize) {
        return "Team size is not valid"
    }
}
