import {NextApiRequest, NextApiResponse} from "next";
import {ApiResponse, createErrorResponse, createSuccessResponse} from "../../../shared/apiResponse";
import {createRepository} from "../../../server/repository";
import {PrismaClient} from ".prisma/client";
import {NewPlayer, registerPlayer} from "../../../server/registerPlayer";

export default async function handleRegisterPlayer(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    if (req.method !== 'POST') {
        return res.status(405).json(createErrorResponse("Method not allowed"));
    }
    try {
        const newPlayer = req.body as NewPlayer
        const repository = createRepository(new PrismaClient())
        await registerPlayer(repository, newPlayer)
        return res.status(200).json(createSuccessResponse())
    } catch (error) {
        return res.status(500).json(createErrorResponse(error))
    }
}


