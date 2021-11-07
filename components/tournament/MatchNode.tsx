import {MatchTreeNode} from "../../server/fullTournament";
import classes from "../../styles/MatchNode.module.css";
import React, {ReactNode, useMemo} from "react";
import {useSetMatchWinner} from "@/components/tournament/TournamentTree";
interface WinButtonProps {
    onClick: () => void,
    children: ReactNode
}
const  WinButton = (props: WinButtonProps)  => (
    <button
        className={"bg-green-500 px-2 py-1 text-white rounded"}
        onClick={props.onClick}
    >
        {props.children}
    </button>
)
interface MatchNodeProps {
    node: MatchTreeNode,
    level?: number
}
export function MatchNode({node, level = 1}: MatchNodeProps) {
    const {
        previousMatches,
        id: matchId,
        teams: [firstTeam, secondTeam],
        winnerId
    } = node
    const {setMatchWinner, isProcessing} = useSetMatchWinner()
    const showActions = useMemo(() => !winnerId && !isProcessing && firstTeam && secondTeam,
        [winnerId, isProcessing, firstTeam, secondTeam]
    )
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
                        <WinButton onClick={() => setMatchWinner({matchId, teamId: firstTeam.id})}>
                            Winner!
                        </WinButton>
                    )}
                </div>
                <div className={`${classes.team} ${secondTeam && secondTeam?.id == winnerId ? classes.winner : ''}  `}>
                    <p>{secondTeam?.name ?? ""}</p>
                    {secondTeam && showActions && (
                        <WinButton onClick={() => setMatchWinner({matchId, teamId: secondTeam.id})}>
                            Winner!
                        </WinButton>
                    )}
                </div>
            </div>
        </div>

    )
}
