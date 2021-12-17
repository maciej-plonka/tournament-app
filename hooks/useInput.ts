import {useEffect, useMemo, useRef, useState} from "react";
import {isNotFalsy} from "../utils/isNotNull";
import {InputProps} from "@/components/Input";

type Validator = (value: string) => string | undefined | null | false

export function useInput(initialValue: string, validators: Validator[] = []): [string, InputProps, string[]] {
    const validatorsRef = useRef(validators)
    const [value, setValue] = useState(initialValue)
    const [changed, setChanged] = useState(false);
    const [errors, setErrors] = useState<string[]>([])

    useEffect(() => {
        validatorsRef.current = validators
    }, [validators])

    useEffect(() => {
        if (!changed) {
            return;
        }
        const newErrors = validatorsRef.current?.map(validator => validator(value)).filter(isNotFalsy) ?? [];
        setErrors(newErrors)
    }, [changed, value])
    const props = useMemo(() => ({
        onChange: (newValue: string) => {
            setValue(newValue)
            if (!changed) {
                setChanged(true)
            }
        },
        value,
        errors
    }), [changed, value, errors]);
    return [value, props, errors]
}
