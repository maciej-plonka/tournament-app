import {Player, Tournament} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../server/prisma";
import {isTitleValid, isValidNumberOfPlayers} from "../../../shared/tournament/validators";

interface ErrorMessage {
    message: string
}

interface CreateTournament {
    title: string,
    players: ReadonlyArray<Player>,
    teamSize: number
}

export default async function createTournament(req: NextApiRequest, res: NextApiResponse<ErrorMessage | undefined>) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Method not allowed"});
    }
    const {title, players, teamSize} = JSON.parse(req.body) as CreateTournament
    if (!isTitleValid(title)) {
        return res.status(400).json({message: "Title is not valid"})
    }
    if (!isValidNumberOfPlayers(players?.length ?? 0)) {
        return res.status(400).json({message: "Number of selected players is not valid"})
    }
    if (!teamSize) {
        return res.status(400).json({message: "Team size is not valid"})
    }
    const savedTournament = await prisma.tournament.create({data: {title}})


    res.end();
}

