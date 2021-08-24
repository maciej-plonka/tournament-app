import {MatchTreeNode} from "../server/matchTree";
import classes from "../styles/MatchNode.module.css";
import React from "react";

export function MatchNode({node, level = 1}: { node: MatchTreeNode, level?: number }) {
    const [firstTeam, secondTeam] = node.teams;
    return (
        <div className={classes.matchNode}>
            {!!node.previousMatches.length && (
                <div className={classes.previousMatches}>
                    {node.previousMatches.map(it => (
                        <MatchNode key={`match_${it.id}`} node={it} level={level + 1}/>
                    ))}
                </div>
            )}
            <div className={classes.currentMatch}>
                <div className={classes.team}>
                    {firstTeam?.name}
                </div>
                <div className={classes.team}>
                    {secondTeam?.name}
                </div>
            </div>
        </div>

    )
}
