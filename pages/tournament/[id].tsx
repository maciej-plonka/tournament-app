import {GetServerSideProps, NextPage} from "next";
import {FullTournament, prepareFullTournament} from "../../server/fullTournament";
import React from "react";
import {MatchNode} from "../../components/MatchNode";
import {MatchTreeContext} from "../../context/MatchTreeContext";

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
            <MatchTreeContext>
                {loading => !loading
                    ? <MatchNode node={fullTournament.finalMatch}/>
                    : <div>Loading...</div>}
            </MatchTreeContext>
        </>

    )
}

export default TournamentPage;
