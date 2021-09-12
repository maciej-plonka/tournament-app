import {canGenerateAvailableTeamSizes} from "./availableTeamSizes";

export function isTitleValid(title: string): boolean {
    return !!title && title.trim().length > 0
}

export function isValidNumberOfPlayers(numberOfPlayers: number): boolean {
    return canGenerateAvailableTeamSizes(numberOfPlayers)
}
