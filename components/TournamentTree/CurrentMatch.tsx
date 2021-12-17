import React, {ReactNode, useMemo} from 'react';
import {Team} from ".prisma/client";
import {useSetMatchWinner} from "@/components/TournamentTree/TournamentTree";
import classes from "../../styles/MatchNode.module.css";
interface CurrentMatchProps {
    winnerId: number | null,
    teams: ReadonlyArray<Team>,
    matchId: number,
}

export function CurrentMatch(props: CurrentMatchProps) {
    const {
        matchId,
        winnerId,
        teams: [firstTeam, secondTeam]
    } = props

    const {setMatchWinner, isProcessing} = useSetMatchWinner()
    const showActions = useMemo(
        () => Boolean(!winnerId && !isProcessing && firstTeam && secondTeam),
        [winnerId, isProcessing, firstTeam, secondTeam]
    )

    return (
        <div className={classes.currentMatch}>
            <CurrentMatchTeam
                showActions={showActions}
                winnerId={winnerId}
                team={firstTeam}
                onClick={() => setMatchWinner({matchId, teamId: firstTeam.id})}
            />
            <CurrentMatchTeam
                showActions={showActions}
                winnerId={winnerId}
                team={secondTeam}
                onClick={() => setMatchWinner({matchId, teamId: secondTeam.id})}
            />
        </div>
    )
}


interface CurrentMatchTeamProps {
    showActions: boolean,
    onClick: () => void,
    winnerId: number | null,
    team: Team | null
}

function CurrentMatchTeam(props: CurrentMatchTeamProps) {
    const {
        team,
        winnerId,
        showActions,
        onClick
    } = props;
    const rootClasses = !winnerId || !team
        ? classes.team
        : `${classes.team} ${winnerId === team.id ? classes.winner : classes.loser}`
    return (
        <div className={rootClasses}>
            <p>{team?.name ?? ""}</p>
            {team && showActions && (
                <WinButton onClick={onClick}>
                    Winner!
                </WinButton>
            )}
        </div>
    )
}

interface WinButtonProps {
    onClick: () => void,
    children: ReactNode
}

const WinButton = (props: WinButtonProps) => (
    <button
        className={"bg-green-500 px-2 py-1 text-white rounded"}
        onClick={props.onClick}
    >
        {props.children}
    </button>
)
