export function generateAvailableTeamSizes(numberOfPlayers: number): number[] {
    const teamSizes: number[] = [];
    for (let teamSize = 1; teamSize <= Math.floor(numberOfPlayers / 2); teamSize++) {
        if (spreadableToMatches(numberOfPlayers / teamSize)) {
            teamSizes.push(teamSize);
        }
    }
    return teamSizes;
}

export function canGenerateAvailableTeamSizes(numberOfPlayers: number): boolean {
    for (let teamSize = 1; teamSize <= Math.floor(numberOfPlayers / 2); teamSize++) {
        if (spreadableToMatches(numberOfPlayers / teamSize)) {
            return true;
        }
    }
    return false;
}

function spreadableToMatches(players: number): boolean {
    if (players < 2) return false;
    let required = 2;
    while (players > required) required *= required;
    return players === required;
}
