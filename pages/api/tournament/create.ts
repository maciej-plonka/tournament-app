import { Tournament } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../server/prisma";
interface ErrorMessage {
    message: string
}
export default async function createTournament(req: NextApiRequest, res: NextApiResponse<Tournament | ErrorMessage>) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Method not allowed"});
    }
    const {tournament, players} = JSON.parse(req.body)
    if(!tournament) {
        return res.status(400).json({message: "Tournament is not part of the payload"});
    }
    if(!players?.length) {
        return res.status(400).json({message: "Players are not part of the payload"})
    }
    const savedTournament = await prisma.tournament.create({data: tournament})
    res.json(savedTournament);
}

