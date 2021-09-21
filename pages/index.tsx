import {Tournament} from '@prisma/client'
import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {getAllTournaments} from "../server/repository";
import {MatchTreeContext} from "../context/MatchTreeContext";

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    return {
        props: {
            tournaments: await getAllTournaments()
        }
    }
}

interface Props {
    tournaments: ReadonlyArray<Tournament>
}

const Home: NextPage<Props> = ({tournaments}) => {
    return (
        <>
            <Head>
                <title>Tournament app</title>
                <meta name="description" content="Tournament app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="h-full ">
                <main className="container mx-auto ">
                    <h1 className="text-4xl text-gray-700">Tournaments</h1>
                    <ul>
                        {tournaments.map(it => (
                            <li key={it.id}>
                                <Link href={`/tournament/${it.id}`}>
                                    {it.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </>
    )
}

export default Home
