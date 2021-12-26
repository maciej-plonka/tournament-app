import React, {FormEvent, useCallback, useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import {Page} from "@/components/Page";
import {PageCard} from "@/components/PageCard";
import {Input} from "@/components/Input";
import {useInput} from "../../hooks/useInput";
import {getCsrfToken, signIn, useSession} from "next-auth/react";



type Credentials = {
    login: string,
    password: string
}


interface LoginProps {
 csrfToken: string
}

export default function LoginPage(props: LoginProps) {
    const [login, loginProps, loginErrors] = useInput('', loginValidators)
    const [password, passwordProps, passwordErrors] = useInput('', passwordValidators)
    const {status} = useSession();
    const {logIn,error,loading} = useLogin()
    useEffect(() => {
        status === 'authenticated' && (window.location.href = '/')
    }, [status])

    const formHasErrors = useMemo(
        () => Boolean(loginErrors.length || passwordErrors.length),
        [loginErrors.length, passwordErrors.length])

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        if(formHasErrors){
            return;
        }
        logIn({login,password})
    }, [formHasErrors,login,logIn,password])

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Page>
                <PageCard>

                    <h1 className="text-4xl mb-4">Login</h1>
                    {loading ? (<div>loading...</div>) :(
                        <form onSubmit={handleSubmit}>
                            <Input{...loginProps} id="login" label="Login" className="text-black" errors={loginErrors}/>
                            <Input{...passwordProps} id="password" label="Password" type="password"
                                  className="text-black"
                                  errors={passwordErrors}/>
                            <button type="submit" disabled={formHasErrors}
                                    className=" mt-3 px-3 py-2 bg-green-500 disabled:bg-gray-300 rounded-md cursor-pointer">
                                Log in
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    )}

                </PageCard>
            </Page>
        </>
    )
}

function useLogin() {
    const [credentials, setCredentials] = useState<Credentials | undefined>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()
    useEffect(() => {
        if (!credentials) {
            return;
        }
        let mounted = true;
        (async function postNewPlayer() {
            mounted && setLoading(true)
            const options = {...credentials, redirect: false}
            const response = await signIn<'credentials'>('credentials', options,);
            mounted && setCredentials(undefined)
            mounted && setLoading(false)
            if (response && !response.ok) {
                mounted && setError(response?.error ?? "Unknown error")
            }
        })()
        return () => {
            mounted = false;
        }
    }, [credentials])
    return {
        logIn: setCredentials,
        loading,
        error
    }
}


const loginValidators = [
    (login: string) => login.trim().length == 0 && 'Login cannot be empty'
]
const passwordValidators = [
    (pass: string) => pass.trim().length == 0 && 'Password cannot be empty',
]
