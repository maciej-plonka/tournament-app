import {GetServerSideProps, NextPage} from "next";
import {FullTournament, prepareFullTournament} from "../../server/fullTournament";
import React from "react";
import {TournamentTree} from "@/components/TournamentTree";
import {createRepository} from "../../server/repository";
import {PrismaClient} from ".prisma/client";
import {Page} from "@/components/Page";
import {PageCard} from "@/components/PageCard";
import Head from "next/head";
import {PageSeparator} from "@/components/PageSeparator";

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (ctx) => {
    const id = ctx?.params?.id ?? '';
    const repository = createRepository(new PrismaClient());
    const fullTournament = await prepareFullTournament(repository, parseInt(id));
    if (!fullTournament) {
        return {notFound: true}
    }
    return {
        props: {
            fullTournament
        }
    }
}

interface Props {
    fullTournament: FullTournament
}


const TournamentPage: NextPage<Props> = ({fullTournament}) => {
    return (
        <>
            <Head>
                <title>Tournament app</title>
                <meta name="description" content={`tournament ${fullTournament.title}`}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Page>
                <PageCard>
                    <h1 className="text-4xl mb-4">{fullTournament.title}</h1>
                    <PageSeparator/>
                    <TournamentTree tournament={fullTournament}/>
                </PageCard>
            </Page>
        </>


    )
}

export default TournamentPage;
