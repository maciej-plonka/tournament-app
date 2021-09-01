import {Player} from "@prisma/client";
import {GetServerSideProps, NextPage} from "next";
import {FormEvent, useCallback, useEffect, useMemo, useState} from "react";
import MultiSelect from "react-multi-select-component";
import {Option} from "react-multi-select-component/dist/lib/interfaces";
import {isNotNull} from "../../utils/isNotNull";
import {RadioInput} from "@/components/RadioInput";
import {prisma} from "../../server/prisma";
import {InputError} from "@/components/InputError";
import axios from "axios";
import {generateAvailableTeamSizes} from "../../shared/tournament/generateAvailableTeamSizes";
import {isTitleValid, isValidNumberOfPlayers} from "../../shared/tournament/validators";
import {CreateTournamentResponse} from "../../shared/tournament/responses";

export const getServerSideProps: GetServerSideProps<NewTournamentProps> = async (ctx) => {
    return {
        props: {
            availablePlayers: await prisma.player.findMany()
        }
    }
}


function mapPlayerToSelectOption(player: Player) {
    return {
        value: player.id,
        label: player.name
    }
}

function useNewTournament(availablePlayers: ReadonlyArray<Player>) {
    const [title, setTitle] = useState('')
    const [players, setPlayers] = useState<ReadonlyArray<Player>>([])
    const [teamSize, setTeamSize] = useState<number>(1);

    const selectedPlayers = useMemo(() => players.map(mapPlayerToSelectOption), [players])
    const allPlayers = useMemo(() => availablePlayers.map(mapPlayerToSelectOption), [availablePlayers]);

    const availableTeamSizes = useMemo(() => generateAvailableTeamSizes(players.length), [players]);

    const errors = useMemo(() => {
        return {
            ...!isTitleValid(title) && {title: 'Invalid title'},
            ...!isValidNumberOfPlayers(players.length) && {players: 'Invalid number of players'},
            ...(teamSize === 0) && {playersPerTeam: 'Specify players per team'}
        }
    }, [title, players, teamSize]);
    const handleNewPlayersSelection = useCallback((options: Option[]) => {
        const newSelectedPlayers = options
            .map(it => availablePlayers.find(player => player.id === it.value))
            .filter(isNotNull)
        setPlayers(newSelectedPlayers)
    }, [availablePlayers])

    async function create(): Promise<CreateTournamentResponse> {
        try {
            const response = await axios.post('/api/tournament/create', {title, players, teamSize});
            return response.data as CreateTournamentResponse
        } catch (error) {
            console.error(error)
            return {type: "error", message: error}
        }
    }

    return {
        fields: {
            title,
            selectedPlayers,
            allPlayers,
            availableTeamSizes,
            teamSize,
            errors,
        },
        actions: {
            updateTitle: setTitle,
            updateTeamSize: setTeamSize,
            handleNewPlayersSelection,
            create,
        }
    }
}

interface NewTournamentProps {
    availablePlayers: ReadonlyArray<Player>
}

const NewTournament: NextPage<NewTournamentProps> = ({availablePlayers}) => {
    const {actions, fields} = useNewTournament(availablePlayers);

    const hasErrors = useMemo(() => Object.keys(fields.errors).length > 0, [fields.errors]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (hasErrors) return;
        const result = await actions.create()
        switch (result.type) {
            case "error":
                alert(result.message);
                break;
            case "success":
                window.location.href = `/tournament/${result.tournament.id}`
                break;
        }
    }

    return (
        <div className="container mx-auto py-4">
            <div className="shadow-md rounded-xl p-4">
                <h1 className="text-3xl text-gray-700">New tournament</h1>
                <form className="mt-4 flex flex-col" onSubmit={handleSubmit}>
                    <div className="w-full sm:w-1/2 lg:1/4 mb-4 flex flex-col">
                        <label htmlFor="title-input">Title</label>
                        <input
                            id="title-input"
                            className="w-full border border-gray-300 rounded px-2 py-1"
                            value={fields.title}
                            onChange={event => actions.updateTitle(event.target.value)}/>
                        {fields.errors.title && (<InputError message={fields.errors.title}/>)}
                    </div>
                    <div className="w-full sm:w-1/2 lg:1/4 mb-4">
                        <label>Players</label>
                        <MultiSelect
                            className={"w-full"}
                            labelledBy={"Players"}
                            value={fields.selectedPlayers}
                            onChange={actions.handleNewPlayersSelection}
                            options={fields.allPlayers}
                        />
                        {fields.errors.players && (<InputError message={fields.errors.players}/>)}
                    </div>

                    <div className="w-full sm:w-1/2 lg:1/4 mb-4">
                        <label>Players per team</label>
                        <RadioInput
                            value={fields.teamSize}
                            values={fields.availableTeamSizes}
                            onValueChanged={actions.updateTeamSize}/>
                    </div>
                    <button
                        className="block mx-auto sm:mx-0 w-36 px-3 py-1.5 rounded  bg-green-500 disabled:bg-gray-300  text-white"
                        disabled={hasErrors}
                        type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}


export default NewTournament
