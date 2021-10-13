import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {MatchNode} from "./MatchNode";
import {FullTournament} from "../../server/fullTournament";
import {SetMatchWinner} from "../../shared/match/commands";

interface TournamentContextParams {
    setMatchWinner(team: SetMatchWinner): void,

    isProcessing: boolean,
}

const TournamentContext = createContext<TournamentContextParams>({
    setMatchWinner(team: SetMatchWinner) {
    },
    isProcessing: false,
});

export function useSetMatchWinner() {
    const ctx = useContext(TournamentContext)
    if (!ctx) {
        throw new Error("You can only use useSetMatchWinner under TournamentTree component");
    }
    return ctx;
}

interface TournamentTreeProps {
    tournament: FullTournament
}

function useTournamentTree( ): TournamentContextParams {
    const [newMatchWinner, setNewMatchWinner] = useState<SetMatchWinner | undefined>()
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!newMatchWinner) {
            return;
        }
        setIsProcessing(true);
        (async () => {

            await fetch('/api/match/winner', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMatchWinner)
            })
            window.location.reload();
        })()
    }, [newMatchWinner])

    const setMatchWinner = useCallback((team: SetMatchWinner) => {
        !isProcessing && setNewMatchWinner(team)
    }, [isProcessing]);

    return {
        isProcessing,
        setMatchWinner,
    }
}

export function TournamentTree(props: TournamentTreeProps) {
    const tournamentTree = useTournamentTree()
    return (
        <TournamentContext.Provider value={tournamentTree}>
            <MatchNode node={props.tournament.finalMatch}/>
        </TournamentContext.Provider>
    )

}
