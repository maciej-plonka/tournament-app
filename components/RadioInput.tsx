import classes from "../styles/RadioInput.module.css"

interface RadioInputProps {
    value: number,
    values: number[],
    onValueChanged: (value: number) => void,
}

export function RadioInput({values, value, onValueChanged}: RadioInputProps) {
    return (
        <div className={classes.wrapper}>
            {values.map(it => (
                <label key={`playersPerTeam_${it}`} className={prepareClasses(it === value)}>
                    <input
                        className="hidden"
                        type="radio"
                        value={it}
                        onChange={() => onValueChanged(it)}
                        checked={it === value}/>
                    {it}
                </label>
            ))}
        </div>
    )
}

function prepareClasses(checked: boolean) {
    return [
        classes.singleInput,
        checked && classes.active
    ].filter(it => !!it).join(' ')
}
