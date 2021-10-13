interface InputErrorProps {
    messages: string[]
}

export function InputError({messages}: InputErrorProps) {
    if (!messages.length)
        return <></>
    return (
        <ul className={"mt-0.5 px-2 py-1 text-red-400"}>
            {messages.map(message => (
                <li key={message}>
                    {message}
                </li>
            ))}
        </ul>
    )
}
