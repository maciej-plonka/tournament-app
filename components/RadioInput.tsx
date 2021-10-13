import classes from "../styles/RadioInput.module.css"
import {InputError} from "@/components/InputError";
import {useMemo} from "react";
import {uuidv4} from "../shared/uuid";

export interface RadioInputProps {
    value: string,
    values: string[],
    onChange: (value: string) => void,
    errors?: string[]
}

interface FinalRadioInputProps extends RadioInputProps {
    id?: string,
    label?: string
    className?: string
}

export function RadioInput({values, value, onChange, id, className = "", errors = [], label}: FinalRadioInputProps) {
    const uuid = useMemo(() => uuidv4(), [])
    const finalId = id ?? uuid
    if (!values.length) {
        return (<></>)
    }
    return (
        <>
            <label htmlFor={finalId}>{label}</label>
            <div id={finalId} className={`${className} ${classes.wrapper}`}>
                {values.map(it => (
                    <label key={`playersPerTeam_${it}`} className={prepareClasses(it === value)}>
                        <input
                            aria-label={it + ''}
                            className="hidden"
                            type="radio"
                            value={it}
                            onChange={() => onChange(it)}
                            checked={it === value}/>
                        {it}
                    </label>
                ))}
            </div>
            <InputError messages={errors}/>
        </>

    )
}

function prepareClasses(checked: boolean) {
    return [
        classes.singleInput,
        checked && classes.active
    ].filter(it => !!it).join(' ')
}
