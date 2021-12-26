import React, {FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import {Page} from "@/components/Page";
import {PageCard} from "@/components/PageCard";
import {useInput} from "../../hooks/useInput";
import {Input} from "@/components/Input";
import {NewPlayer} from "../../server/registerPlayer";
import axios from "axios";

interface RegisterProps {

}

function useNewPlayer() {
    const [newPlayer, setNewPlayer] = useState<NewPlayer | undefined>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!newPlayer) {
            return;
        }
        let mounted = true;
        (async function postNewPlayer() {
            mounted && setLoading(true)
            await axios.post('/api/player/register', newPlayer)
            mounted && setNewPlayer(undefined)
            mounted && setLoading(false)
        })()
        return () => {
            mounted = false;
        }
    }, [newPlayer])
    return {
        registerPlayer: setNewPlayer,
        loading
    }
}

export default function RegisterPage(props: RegisterProps) {
    const [login, loginProps, loginErrors] = useInput('', loginValidators)
    const [name, nameProps, nameErrors] = useInput('', nameValidators)
    const [password, passwordProps, passwordErrors] = useInput('', passwordValidators)
    const {registerPlayer, loading} = useNewPlayer()
    const hasErrors = useMemo(
        () => Boolean(loginErrors.length || passwordErrors.length || nameErrors.length),
        [loginErrors.length, passwordErrors.length, nameErrors.length])

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        if (hasErrors) {
            return;
        }
        registerPlayer({login, name, password})
    }, [hasErrors, login, name, password, registerPlayer])

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
