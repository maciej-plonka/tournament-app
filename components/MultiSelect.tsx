import Select from "react-select/base";
import {useCallback, useMemo, useState} from "react";
import {uuidv4} from "../shared/uuid";
import {InputError} from "@/components/InputError";

export type SelectOption = {
    id: number | string,
    label: string
}

export interface MultiSelectProps<T = ReadonlyArray<SelectOption>> {
    onChange: (options: T) => void,
    value: T
    options: T,
    errors?: string[],
}

interface FinalMultiSelectProps<T = ReadonlyArray<SelectOption>> extends MultiSelectProps<T> {
    label?: string
    id?: string,
    className?: string,
}


const getOptionLabel = (option: SelectOption) => option.label;
const getOptionValue = (option: SelectOption) => option.id + '';

export function MultiSelect({value, options, onChange, className = "", id, label , errors = []}: FinalMultiSelectProps) {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);

    const onMenuOpen = useCallback(() => setOpen(true), []);
    const onMenuClose = useCallback(() => setOpen(false), []);
    const filteredOptions = useMemo(() => {
        if (!search)
            return options;
        return options.filter(it => it.label.toLowerCase().includes(search.toLowerCase()))
    }, [search, options])

    const uuid = useMemo(() => uuidv4(), []);
    const finalId = id ?? uuid
    return (
        <>
            <label htmlFor={finalId}>
                {label}
            </label>
            <Select<SelectOption, true>
                id={id ?? uuid}
                isMulti
                menuIsOpen={open}
                className={"w-full " + className }
                options={filteredOptions}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                onChange={onChange}
                onMenuClose={onMenuClose}
                onInputChange={setSearch}
                onMenuOpen={onMenuOpen}
                value={value}
                inputValue={search}/>
            <InputError messages={errors} />
        </>

)
}
