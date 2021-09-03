import {generateAvailableTeamSizes} from "./generateAvailableTeamSizes";

describe('generateAvailableTeamSizes', () => {
    it('should return [ ] for 0 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(0);

        expect(availableTeamSizes.length).toBe(0)
    })

    it('should return [ ] for 1 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(1);

        expect(availableTeamSizes.length).toBe(0)
    })

    it('should return [1] for 2 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(2);

        expect(availableTeamSizes.length).toBe(1)
        expect(availableTeamSizes[0]).toBe(1)
    })

    it('should return [ ] for 3 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(3);

        expect(availableTeamSizes.length).toBe(0)
    })

    it('should return [1, 2] for 4 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(4);

        expect(availableTeamSizes.length).toBe(2)
        expect(availableTeamSizes[0]).toBe(1)
        expect(availableTeamSizes[1]).toBe(2)
    })

    it('should return [ ] for 5 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(5);

        expect(availableTeamSizes.length).toBe(0)
    })

    it('should return [3] for 6 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(6);

        expect(availableTeamSizes.length).toBe(1)
        expect(availableTeamSizes[0]).toBe(3)
    })

    it('should return [ ] for 7 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(7);

        expect(availableTeamSizes.length).toBe(0)
    })

    it('should return [1, 2, 4] for 8 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(8);
        expect(availableTeamSizes.length).toBe(3)
        expect(availableTeamSizes[0]).toBe(1)
        expect(availableTeamSizes[1]).toBe(2)
        expect(availableTeamSizes[2]).toBe(4)
    })

    it('should return [ ] for 9 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(9);

        expect(availableTeamSizes.length).toBe(0)
    })

    it('should return [5] for 10 players', () => {
        const availableTeamSizes = generateAvailableTeamSizes(10);

        expect(availableTeamSizes.length).toBe(1)
        expect(availableTeamSizes[0]).toBe(5)
    })
});

describe('canGenerateAvailableTeamSizes', () => {
    it('', () => {})
});
