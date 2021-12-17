import React, {FormEvent, useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import {Page} from "@/components/Page";
import {PageCard} from "@/components/PageCard";
import {useInput} from "../../hooks/useInput";
import {Input} from "@/components/Input";
import {NewPlayer} from "../../server/registerPlayer";

interface RegisterProps {

}

function useNewPlayer(): [(newPlayer: NewPlayer) => void, boolean] {
    const [newPlayer, setNewPlayer] = useState<NewPlayer | undefined>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!newPlayer) {
            return;
        }
        let mounted = true;
        (async function postNewPlayer() {
            mounted && setLoading(true)
            const result = await fetch('/api/player/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlayer)
            })
            mounted && setLoading(false)
            mounted && setNewPlayer(undefined)
        })()
        return () => {
            mounted = false;
        }
    }, [newPlayer])
    return [setNewPlayer, loading]
}

export default function RegisterPage(props: RegisterProps) {
    const [login, loginProps, loginErrors] = useInput('', loginValidators)
    const [name, nameProps, nameErrors] = useInput('', nameValidators)
    const [password, passwordProps, passwordErrors] = useInput('', passwordValidators)
    const [uploadNewPlayer, loading] = useNewPlayer()
    const hasErrors = useMemo(() => (loginErrors.length + passwordErrors.length + nameErrors.length) > 0,
        [loginErrors.length, passwordErrors.length, nameErrors.length])

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (hasErrors) {
            return;
        }
        uploadNewPlayer({login, name, password})
    }

    return (
        <>
            <Head>
                <title>Register new player</title>
                <meta name="description" content="New player page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Page>
                <PageCard>
                    <h1 className="text-4xl mb-4">Registration</h1>
                    {loading ? <div>Loading...</div> : (
                        <form onSubmit={handleSubmit}>
                            <Input{...nameProps} label="Name" className="text-black" errors={nameErrors}/>
                            <Input{...loginProps} label="Login" className="text-black" errors={loginErrors}/>
                            <Input{...passwordProps} label="Password" type="password" className="text-black"
                                  errors={passwordErrors}/>
                            <button type="submit" disabled={hasErrors}
                                    className=" mt-3 px-3 py-2 bg-green-500 disabled:bg-gray-300 rounded-md cursor-pointer">
                                Create
                            </button>
                        </form>
                    )}
                </PageCard>
            </Page>
        </>
    )
}
const nameValidators = [
    (name: string) => name.trim().length == 0 && 'Name cannot be empty'
]
const loginValidators = [
    (login: string) => login.trim().length == 0 && 'Login cannot be empty'
]
const passwordValidators = [
    (pass: string) => pass.trim().length == 0 && 'Password cannot be empty',
]
