import {MatchTreeNode, MatchWithTeams} from "./model";


export function generateTree(matches: ReadonlyArray<MatchWithTeams>): MatchTreeNode {
    const finalMatch = matches.find(it => !it.nextMatchId);
    if (!finalMatch) {
        throw new Error(`final match not found inside ${matches}`)
    }
    return generateTreeNode(finalMatch, matches)
}

function generateTreeNode(match: Readonly<MatchWithTeams>, matches: ReadonlyArray<MatchWithTeams>): MatchTreeNode {
    const previousMatches = matches
        .filter(it => it.nextMatchId === match.id)
        .map(match => generateTreeNode(match, matches));
    return {
        id: match.id,
        teams: match.teams,
        winnerId: match.winnerId,
        previousMatches: previousMatches
    }
}
