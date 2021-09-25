import {useMemo, useState} from "react";
import {isNotFalsy} from "../utils/isNotNull";
import {InputProps} from "@/components/Input";

type Validator = (value: string) => string | undefined | null | false

export function useInput(initialValue: string, validators: Validator[] = []): [string, InputProps, string[]] {
    const [value, setValue] = useState(initialValue)
    const [changed, setChanged] = useState(false);
    const errors = (
        useMemo(
            () => validators.map(validator => validator(value)).filter(isNotFalsy),
            [value, validators]
        )
    )
    const props = useMemo(() => ({
        onChange: (newValue: string) => {
            setValue(newValue)
            if (!changed) {
                setChanged(true)
            }
        },
        value,
        errors: changed ? errors : []
    }), [changed, value, errors]);
    return [value, props, errors]
}
