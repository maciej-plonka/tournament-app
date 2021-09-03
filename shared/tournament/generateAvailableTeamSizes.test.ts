import {generateAvailableTeamSizes} from "./generateAvailableTeamSizes";

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

        expect(availableTeamSizes).toStrictEqual([1,2])
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

        expect(availableTeamSizes).toStrictEqual([1,2,4])
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
    it('', () => {})
});
