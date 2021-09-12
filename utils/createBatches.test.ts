import {createBatches} from "./createBatches";

describe('createBatches',() => {
    it('returns empty array when provided empty array', () => {
        const emptyArray: any[] = [];

        const result = createBatches(emptyArray, 1);

        expect(result).toStrictEqual([])
    })

    it('throws an error when provided with invalid batchSize', () => {

        const createInvalidAction = (batchSize: number) => () => createBatches([],batchSize);

        expect(createInvalidAction(0)).toThrow(Error)
        expect(createInvalidAction(0)).toThrow('Invalid batchSize: 0')
        expect(createInvalidAction(-1)).toThrow('Invalid batchSize: -1')
    })

    it('returns 2 batches when provided with 4 elements and batchSize = 2', () => {
        const values = [1,2,3,4]
        const batchSize = 2;

        const [first, second] = createBatches(values, batchSize )

        expect(first).toStrictEqual([1,2])
        expect(second).toStrictEqual([3,4])
    })

    it('returns 2 batches, one not full, when provided with 3 elements and batchSize = 2', () => {
        const values = [1,2,3]
        const batchSize = 2;

        const [first, second] = createBatches(values, batchSize )

        expect(first).toStrictEqual([1,2])
        expect(second).toStrictEqual([3])
    })
})
