import React, {createContext, useCallback, useContext, useState} from "react";
import axios from "axios";
import {ApiResponse} from "../shared/apiResponse";

const initialState = {
    loading: false,
    chooseWinner: (matchId: number, teamId: number): Promise<string | void> => Promise.resolve()
}

const Context = createContext(initialState)

export function useMatchTreeContext() {
    return useContext(Context)
}

export function MatchTreeContext({children}: { children: (loading: boolean) => React.ReactNode }) {
    const [loading, setLoading] = useState(false)
    const chooseWinner = useCallback(async (matchId: number, teamId: number) => {
        if (loading) {
            return;
        }
        setLoading(true)
        try {
            const result = await axios.post('/match/winner', {matchId, teamId})
            const data = result.data as ApiResponse
            if (data.type === "error") {
                return data.message
            }
        } catch (error) {
            return error;
        }
        setLoading(false)
    }, [loading])
    return (
        <Context.Provider value={{loading, chooseWinner}}>
            {children(loading)}
        </Context.Provider>
    )
}
