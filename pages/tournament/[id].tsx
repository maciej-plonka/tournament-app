import {GetServerSideProps, NextPage} from "next";
import {FullTournament, prepareFullTournament} from "../../server/fullTournament";
import React from "react";
import {MatchNode} from "../../components/MatchNode";

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (ctx) => {
    const id = ctx?.params?.id ?? '';
    const fullTournament = await prepareFullTournament(parseInt(id));
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
            <div>{fullTournament.id}</div>
            <div>{fullTournament.title}</div>
            <MatchNode node={fullTournament.finalMatch}/>
        </>

    )
}

export default TournamentPage;
