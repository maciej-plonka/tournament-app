import {NextApiRequest, NextApiResponse} from "next";
import {SetMatchWinner} from "../../../shared/match/commands";
import {setWinnerForMatch} from "../../../server/setWinnerForMatch";
import {ApiResponse, createErrorResponse, createSuccessResponse} from "../../../shared/apiResponse";


export default async function setMatchWinner(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    if (req.method !== 'POST') {
        return res.status(405).json(createErrorResponse("Method not allowed"));
    }
    try {
        const setWinner = req.body as SetMatchWinner
        await setWinnerForMatch(setWinner)
        return res.status(200).json(createSuccessResponse())
    } catch (error) {
        return res.status(500).json(createErrorResponse(error))
    }
}


