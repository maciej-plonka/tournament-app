import {Player, PrismaClient, Tournament} from "@prisma/client";
import {GetServerSideProps, NextPage} from "next";
import {FormEvent, useCallback, useMemo, useState} from "react";
import axios from "axios";
import {canGenerateAvailableTeamSizes, generateAvailableTeamSizes} from "../../shared/tournament/availableTeamSizes";
import {useInput} from "../../hooks/useInput";
import {usePlayerMultiSelect} from "../../hooks/usePlayerMultiSelect";
import {MultiSelect} from "@/components/MultiSelect";
import {useTeamSizeRadioInput} from "../../hooks/useRadioInput";
import {RadioInput} from "@/components/RadioInput";
import {Input} from "@/components/Input";
import {ApiResponse} from "../../shared/apiResponse";
import {createRepository} from "../../server/repository";


export const getServerSideProps: GetServerSideProps<NewTournamentProps> = async () => {
    const repository = createRepository(new PrismaClient());
    const availablePlayers = await repository.getAllPlayers()
    return {
        props: {
            availablePlayers
        }
    }
}


const titleValidators = [
    (title: string) => !title.length && 'Title should not be empty'
]

const playersValidators = [
    (players: readonly Player[]) => !canGenerateAvailableTeamSizes(players.length) && "Cannot split players into proper teams"
]

const teamSizeValidators = [
    (teamSize: number) => teamSize == 0 && "Please select valid team size"
]

function useNewTournament(availablePlayers: ReadonlyArray<Player>) {
    const [changed, setChanged] = useState(false)
    const [title, titleProps, titleErrors] = useInput('', titleValidators);
    const [players, playersProps, playersErrors] = usePlayerMultiSelect([], availablePlayers, playersValidators)

    const availableTeamSizes = useMemo(() => generateAvailableTeamSizes(players.length), [players]);
    const [teamSize, teamSizeProps, teamSizeErrors] = useTeamSizeRadioInput(0, availableTeamSizes, teamSizeValidators)

    const hasErrors = useMemo(
        () => (teamSizeErrors.length + playersErrors.length + titleErrors.length) > 0,
        [titleErrors, playersErrors, teamSizeErrors]
    )

    const payload = useMemo(() => ({title, players, teamSize}), [title, players, teamSize])

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault()
        if (changed && !hasErrors)
            try {
                const response = await axios.post('/api/tournament/create', payload);
                const data = response.data as ApiResponse<Tournament>
                switch (data.type) {
                    case "success": {
                        window.location.href = `/tournament/${data.payload?.id}`
                        break;
                    }
                    case "error": {
                        alert(data.message)
                        break;
                    }
                }
            } catch (error) {
                alert(error)
            }
    }, [changed, hasErrors, payload]);

    const formProps = useMemo(() => ({
        onSubmit: handleSubmit,
        onChange: () => setChanged(true)
    }), [handleSubmit]);

    const canSubmit = useMemo(() => changed && !hasErrors, [hasErrors, changed])

    return {
        formProps,
        titleProps,
        playersProps,
        teamSizeProps,
        canSubmit,
    }
}

interface NewTournamentProps {
    availablePlayers: ReadonlyArray<Player>
}

const NewTournament: NextPage<NewTournamentProps> = ({availablePlayers}) => {
    const {titleProps, formProps, playersProps, teamSizeProps, canSubmit,} = useNewTournament(availablePlayers);
    return (
        <div className="container mx-auto py-4">
            <div className="shadow-md rounded-xl p-4">
                <h1 className="text-3xl text-gray-700">New tournament</h1>
                <form className="mt-4 flex flex-col" {...formProps}>
                    <div className="w-full sm:w-1/2 lg:1/4 mb-4 flex flex-col">
                        <Input
                            id="title"
                            label="Title"
                            {...titleProps} />
                    </div>
                    <div className="w-full sm:w-1/2 lg:1/4 mb-4">
                        <MultiSelect
                            id="players"
                            label="Players"
                            {...playersProps} />
                    </div>

                    <div className="w-full sm:w-1/2 lg:1/4 mb-4">
                        <RadioInput
                            id="teamSize"
                            label="Players per team"
                            {...teamSizeProps} />
                    </div>
                    <button
                        className="block mx-auto sm:mx-0 w-36 px-3 py-1.5 rounded bg-green-500 disabled:bg-gray-300 text-white"
                        disabled={!canSubmit}
                        type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}


export default NewTournament
