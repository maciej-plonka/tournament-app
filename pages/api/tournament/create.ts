import {Player, Tournament} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {isTitleValid, isValidNumberOfPlayers} from "../../../shared/tournament/validators";
import {createRandomTournament} from "../../../server/createRandomTournament";
import {ApiResponse, createErrorResponse, createSuccessResponse} from "../../../shared/apiResponse";
import {createRandomTeams} from "../../../server/createRandomTeams";

interface CreateTournament {
    title: string,
    players: ReadonlyArray<Player>,
    teamSize: number
}

export default async function createTournament(req: NextApiRequest, res: NextApiResponse<ApiResponse<Tournament>>) {
    if (req.method !== 'POST') {
        return res.status(405).json(createErrorResponse("Method not allowed"));
    }
    const createTournament = req.body as CreateTournament
    const validationError = validateCreateTournament(createTournament);
    if (validationError) {
        return res.status(400).json(createErrorResponse(validationError))
    }
    const {title, players, teamSize} = createTournament;
    const teams = await createRandomTeams(players, teamSize);
    const tournament = await createRandomTournament(title, teams)
    return res.status(200).json(createSuccessResponse(tournament))
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
