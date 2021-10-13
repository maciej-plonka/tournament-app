import {MatchTreeNode} from "../../server/matchTree";
import classes from "../../styles/MatchNode.module.css";
import React, {useMemo} from "react";
import {useSetMatchWinner} from "@/components/tournament/TournamentTree";

export function MatchNode({node, level = 1}: { node: MatchTreeNode, level?: number }) {
    const {
        previousMatches,
        id: matchId,
        teams: [firstTeam, secondTeam],
        winnerId
    } = node
    const {setMatchWinner, isProcessing} = useSetMatchWinner()
    const showActions = useMemo(() => !winnerId && !isProcessing, [winnerId, isProcessing])
    return (
        <div className={classes.matchNode}>
            {!!node.previousMatches.length && (
                <div className={classes.previousMatches}>
                    {previousMatches.map(it => (
                        <MatchNode key={`match_${it.id}`} node={it} level={level + 1}/>
                    ))}
                </div>
            )}
            <div className={classes.currentMatch}>
                <div className={`${classes.team} ${firstTeam && firstTeam?.id == winnerId ? classes.winner : ''}  `}>
                    <p>{firstTeam?.name ?? ""}</p>
                    {firstTeam && showActions && (
                        <button onClick={() => setMatchWinner({matchId, teamId: firstTeam.id})}>
                            Winner!
                        </button>
                    )}
                </div>
                <div className={`${classes.team} ${secondTeam && secondTeam?.id == winnerId ? classes.winner : ''}  `}>
                    <p>{secondTeam?.name ?? ""}</p>
                    {secondTeam && showActions && (
                        <button onClick={() => setMatchWinner({matchId, teamId: secondTeam.id})}>
                            Winner!
                        </button>
                    )}
                </div>
            </div>
        </div>

    )
}
