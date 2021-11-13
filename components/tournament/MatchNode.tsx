import React from "react";
import type {MatchTreeNode} from "../../server/fullTournament";
import classes from "../../styles/MatchNode.module.css";
import {CurrentMatch} from "@/components/tournament/CurrentMatch";
import {PreviousMatches} from "@/components/tournament/PreviousMatches";


interface MatchNodeProps {
    node: MatchTreeNode,
}

export function MatchNode({node}: MatchNodeProps) {
    return (
        <div className={classes.matchNode}>
            <PreviousMatches previousMatches={node.previousMatches}/>
            <CurrentMatch
                matchId={node.id}
                teams={node.teams}
                winnerId={node.winnerId}
            />
        </div>
    )
}

