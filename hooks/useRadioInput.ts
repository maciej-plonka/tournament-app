import {RadioInputProps} from "@/components/RadioInput";
import {useEffect, useMemo, useState} from "react";
import {isNotFalsy} from "../utils/isNotNull";

type TeamSizeRadioInputValidator = (playerNumber: number) => string | null | undefined | false

export function useTeamSizeRadioInput(
    initialValue: number = 0,
    availableTeamSizes: ReadonlyArray<number> = [],
    validators: ReadonlyArray<TeamSizeRadioInputValidator> = []
): [number, RadioInputProps, string[]] {
    const [teamSize, setTeamSize] = useState(initialValue);
    const [changed, setChanged] = useState(false)
    useEffect(
        () => setTeamSize(previous => availableTeamSizes.includes(previous) ? previous : 0),
        [availableTeamSizes]
    )

    const errors = (
        useMemo(
            () => validators.map(validator => validator(teamSize)).filter(isNotFalsy),
            [teamSize, validators]
        )
    )


    const props = useMemo(() => ({
        value: teamSize + '',
        onChange: (text: string) => {
            setTeamSize(parseInt(text))
            if (!changed) {
                setChanged(true)
            }
        },
        errors: changed ? errors : [],
        values: availableTeamSizes.map(it => it + '')
    }), [changed, teamSize, availableTeamSizes, errors]);
    return [teamSize, props, errors]
}
