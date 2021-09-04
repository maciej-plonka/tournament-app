export function generateAvailableTeamSizes(numberOfPlayers: number): number[] {
    if (numberOfPlayers % 2 != 0) {
        return [];
    }
    const teamSizes: number[] = [];
    for (let teamSize = 1; teamSize <= Math.floor(numberOfPlayers / 2); teamSize++) {
        if (numberOfPlayers % teamSize != 0) {
            continue;
        }
        const teams = Math.floor(numberOfPlayers / teamSize)
        if (canBeSpreadToValidNumberOfMatches(teams)) {
            teamSizes.push(teamSize);
        }
    }
    return teamSizes;
}

export function canGenerateAvailableTeamSizes(numberOfPlayers: number): boolean {
    if (numberOfPlayers % 2 != 0) {
        return false;
    }
    for (let teamSize = 1; teamSize <= Math.floor(numberOfPlayers / 2); teamSize++) {
        if (numberOfPlayers % teamSize != 0) {
            continue;
        }
        const teams = Math.floor(numberOfPlayers / teamSize)
        if (canBeSpreadToValidNumberOfMatches(teams)) {
            return true;
        }
    }
    return false;
}


function canBeSpreadToValidNumberOfMatches(teams: number) {
    if (teams < 2) {
        return false;
    }
    while (teams % 2 == 0 && teams > 2) teams /= 2;
    return teams % 2 == 0;
}

