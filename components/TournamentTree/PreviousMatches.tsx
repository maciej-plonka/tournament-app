import classes from "../../styles/MatchNode.module.css";
import React from "react";
import {MatchTreeNode} from "../../server/fullTournament";
import {MatchNode} from "@/components/TournamentTree/MatchNode";

interface PreviousMatchesProps {
    previousMatches: ReadonlyArray<MatchTreeNode>
}

export function PreviousMatches(props: PreviousMatchesProps) {
    const {previousMatches,} = props
    if (!previousMatches.length) {
        return <></>
    }
    return (
        <div className={classes.previousMatches}>
            {previousMatches.map(it => (
                <MatchNode key={`match_${it.id}`} node={it}/>
            ))}
        </div>
    )
}
