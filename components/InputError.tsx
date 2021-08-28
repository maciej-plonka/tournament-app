interface InputErrorProps {
    message: string
}

export function InputError({message}: InputErrorProps) {
    return (
        <div className={"px-2 py-1 bg-red-100 text-red-600"}>
            {message}
        </div>
    )
}
