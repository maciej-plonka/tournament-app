import {canGenerateAvailableTeamSizes, generateAvailableTeamSizes} from "./availableTeamSizes";

describe('generateAvailableTeamSizes', () => {
    it('should return [ ] for 0 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(0);

        expect(availableTeamSizes).toStrictEqual([])
    })

    it('should return [ ] for 1 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(1);

        expect(availableTeamSizes).toStrictEqual([])
    })

    it('should return [1] for 2 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(2);

        expect(availableTeamSizes).toStrictEqual([1])
    })

    it('should return [ ] for 3 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(3);

        expect(availableTeamSizes).toStrictEqual([])
    })

    it('should return [1, 2] for 4 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(4);

        expect(availableTeamSizes).toStrictEqual([1, 2])
    })

    it('should return [ ] for 5 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(5);

        expect(availableTeamSizes).toStrictEqual([])
    })

    it('should return [3] for 6 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(6);

        expect(availableTeamSizes).toStrictEqual([3])
    })

    it('should return [ ] for 7 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(7);

        expect(availableTeamSizes).toStrictEqual([])
    })

    it('should return [1, 2, 4] for 8 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(8);

        expect(availableTeamSizes).toStrictEqual([1, 2, 4])
    })

    it('should return [ ] for 9 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(9);

        expect(availableTeamSizes).toStrictEqual([])
    })

    it('should return [5] for 10 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(10);

        expect(availableTeamSizes).toStrictEqual([5])
    })
});

describe('canGenerateAvailableTeamSizes', () => {
    it('should return false for 0 players', () => {
        expect(canGenerateAvailableTeamSizes(0)).toBe(false)
    })

    it('should return false for 1 players', () => {
        expect(canGenerateAvailableTeamSizes(1)).toBe(false)
    })

    it('should return true for 2 players', () => {
        expect(canGenerateAvailableTeamSizes(2)).toBe(true)
    })

    it('should return false for 3 players', () => {
        expect(canGenerateAvailableTeamSizes(3)).toBe(false)
    })

    it('should return true for 4 players', () => {
        expect(canGenerateAvailableTeamSizes(4)).toBe(true)
    })

    it('should return false for 5 players', () => {
        expect(canGenerateAvailableTeamSizes(5)).toBe(false)
    })

    it('should return true for 6 players', () => {
        expect(canGenerateAvailableTeamSizes(6)).toBe(true)
    })

    it('should return false for 7 players', () => {
        expect(canGenerateAvailableTeamSizes(7)).toBe(false)
    })

    it('should return true for 8 players', () => {
        expect(canGenerateAvailableTeamSizes(8)).toBe(true)
    })

    it('should return false for 9 players', () => {
        expect(canGenerateAvailableTeamSizes(9)).toBe(false)
    })

    it('should return true for 10 players', () => {
        expect(canGenerateAvailableTeamSizes(10)).toBe(true)
    })
});
