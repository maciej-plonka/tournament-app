import {sortBy} from "./sortBy";
import {expect} from "@jest/globals";

describe('sortBy', () => {
    it('returns empty array when provided empty array', () => {
        const emptyArray: string[] = [];

        const sortedArray = sortBy(emptyArray,it => it);

        expect(sortedArray).toStrictEqual([])
    })

    it('properly sorts array of strings by values', () => {
        const unsortedArray: string[] = ['c','a','b'];

        const sortedArray = sortBy(unsortedArray,it => it);

        expect(sortedArray).toStrictEqual(['a','b','c'])
    })

    it('properly sorts array of numbers by values', () => {
        const unsortedArray: number[] = [3,4,5,2,1];

        const sortedArray = sortBy(unsortedArray,it => it);

        expect(sortedArray).toStrictEqual([1,2,3,4,5])
    })

    it('properly sorts objects by sortable property', () => {
        const unsortedPeople = [
            {id: 2, name: 'Second name'},
            {id: 1, name: 'First name'},
            {id: 3, name: 'Third name'},
        ]

        const sortedPeople = sortBy(unsortedPeople,it => it.id);

        expect(sortedPeople).toStrictEqual([
            {id: 1, name: 'First name'},
            {id: 2, name: 'Second name'},
            {id: 3, name: 'Third name'},
        ])
    })
})
