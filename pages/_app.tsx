import 'tailwindcss/tailwind.css'
import type {AppProps} from 'next/app'
import '../styles/globals.css'
import {SessionProvider} from "next-auth/react";

function MyApp({Component, pageProps}: AppProps) {
    const {session, ...componentProps} = pageProps
    return (
        <SessionProvider session={session}>
            <Component {...componentProps} />
        </SessionProvider>
    )
}

export default MyApp
