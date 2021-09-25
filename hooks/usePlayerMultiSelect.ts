import {Player} from "@prisma/client";
import {MultiSelectProps, SelectOption} from "@/components/MultiSelect";
import {useMemo, useState} from "react";
import {isNotFalsy, isNotNull} from "../utils/isNotNull";

type PlayerMultiSelectValidator = (players: ReadonlyArray<Player>) => string | undefined | null | false

const playerToOption = (player: Player): SelectOption => ({
    id: player.id,
    label: player.name
})

const findPlayerByOption = (players: ReadonlyArray<Player>, option: SelectOption) => players.find(player => player.id === option.id)


export function usePlayerMultiSelect(
    selectedPlayers: ReadonlyArray<Player> = [],
    allPlayers: ReadonlyArray<Player> = [],
    validators: ReadonlyArray<PlayerMultiSelectValidator> = []
): [ReadonlyArray<Player>, MultiSelectProps, string[]] {
    const [players, setPlayers] = useState(selectedPlayers);
    const [changed, setChanged] = useState(false);
    const value = useMemo(() => players.map(playerToOption), [players])

    const options = useMemo(() => allPlayers.map(playerToOption), [allPlayers])

    const errors = (
        useMemo(
            () => validators.map(validator => validator(players)).filter(isNotFalsy),
            [players, validators]
        )
    )

    const props = useMemo(() => ({
        onChange: (options: ReadonlyArray<SelectOption>) => {
            const foundPlayers = options.map(option => findPlayerByOption(allPlayers, option)).filter(isNotNull);
            setPlayers(foundPlayers)
            if (!changed) {
                setChanged(true)
            }
        },
        value,
        options,
        errors: changed ? errors : []
    }), [options, allPlayers, changed, value, errors]);
    return [players, props, errors]
}
