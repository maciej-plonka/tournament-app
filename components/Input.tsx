import {ChangeEvent, useCallback, useMemo} from "react";
import {uuidv4} from "../shared/uuid";
import {InputError} from "@/components/InputError";

export interface InputProps {
    value: string,
    onChange: (value: string) => void
    errors?: string[]
}

interface FinalInputProps extends InputProps {
    id?: string
    label?: string,
    className?: string
    type?: 'text' | 'password'
}

export function Input({id, value, onChange, errors = [], className = "", label, type = 'text'}: FinalInputProps) {
    const uuid = useMemo(() => uuidv4(), []);
    const finalId = id ?? uuid

    const handleOnChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
        [onChange]
    )
    const errorStyles = useMemo(() => errors?.length > 0 ? "border-red-400" : "", [errors])
    return (
        <>
            <label htmlFor={finalId}>{label}</label>
            <input
                id={finalId}
                value={value}
                type={type}
                onChange={handleOnChange}
                className={"w-full border border-gray-300 rounded px-2 py-1" + " " + className + " " + errorStyles}
            />
            <InputError messages={errors}/>
        </>
    )
}
