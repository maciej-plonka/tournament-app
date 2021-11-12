import {Page} from '@/components/Page';
import {PrismaClient, Tournament} from '@prisma/client'
import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react';
import {createRepository} from "../server/repository";
import {PageCard} from "@/components/PageCard";

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const repository = createRepository(new PrismaClient())
    return {
        props: {
            tournaments: await repository.getAllTournaments()
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
            <Page>
                <PageCard>
                    <h1 className="text-5xl mb-4">Tournaments</h1>
                    <Spacer/>
                    <div className="flex flex-row">
                        <div className="flex flex-col flex-1">

                            <ul>
                                {tournaments.map(it => (
                                    <li key={it.id}>
                                        <Link href={`/tournament/${it.id}`}>
                                            {it.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <Link href="/tournament/new" >
                                <div className="px-3 py-2 bg-green-500 rounded-md cursor-pointer">
                                    Create tournament
                                </div>
                            </Link>
                        </div>
                    </div>

                </PageCard>

            </Page>
        </>
    )
}

const Spacer = () =>( <div className="w-full h-1 bg-red-700 my-4"/> )


export default Home
