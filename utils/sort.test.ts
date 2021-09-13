import {sort, sortBy, sortByKey} from "./sort";
import {expect} from "@jest/globals";

describe('sort', () => {
    it('returns empty array when provided empty array', () => {
        const emptyArray: string[] = [];

        const sortedArray = sort(emptyArray);

        expect(sortedArray).toStrictEqual([])
    })

    it('properly sorts array of strings by values', () => {
        const unsortedArray: string[] = ['c', 'a', 'b'];

        const sortedArray = sort(unsortedArray);

        expect(sortedArray).toStrictEqual(['a', 'b', 'c'])
    })

    it('properly sorts array of numbers by values', () => {
        const unsortedArray: number[] = [3, 4, 5, 2, 1];

        const sortedArray = sort(unsortedArray);

        expect(sortedArray).toStrictEqual([1, 2, 3, 4, 5])
    })
})

describe('sortBy', () => {
    it('returns empty array when provided empty array', () => {
        const emptyArray: string[] = [];

        const sortedArray = sortBy(emptyArray, it => it);

        expect(sortedArray).toStrictEqual([])
    })


    it('properly sorts objects by sortable property', () => {
        const unsortedPeople = [
            {id: 2, name: 'Second name'},
            {id: 1, name: 'First name'},
            {id: 3, name: 'Third name'},
        ]

        const sortedPeople = sortBy(unsortedPeople, it => it.id);

        expect(sortedPeople).toStrictEqual([
            {id: 1, name: 'First name'},
            {id: 2, name: 'Second name'},
            {id: 3, name: 'Third name'},
        ])
    })

    it('properly sorts objects by deeply nested sortable property', () => {
        const unsortedPeople = [
            {
                name: 'Second name',
                birth: { year: 1998 }
            },
            {
                name: 'First name',
                birth: { year: 1994 }
            },
            {
                name: 'Third name',
                birth: { year: 1997 }
            },
        ]

        const sortedPeople = sortBy(unsortedPeople, it => it.birth.year);

        expect(sortedPeople).toStrictEqual([
            {
                name: 'First name',
                birth: { year: 1994 }
            },
            {
                name: 'Third name',
                birth: { year: 1997 }
            },
            {
                name: 'Second name',
                birth: { year: 1998 }
            },
        ])
    })
})

describe('sortByKey', () => {
    it('returns empty array when provided empty array', () => {
        const emptyArray: { id: number }[] = [];

        const sortedArray = sortByKey(emptyArray, "id");

        expect(sortedArray).toStrictEqual([])
    })

    it('properly sorts objects by sortable property', () => {
        const unsortedPeople = [
            {id: 2, name: 'A'},
            {id: 1, name: 'C'},
            {id: 3, name: 'B'},
        ]

        expect(sortByKey(unsortedPeople, "id")).toStrictEqual([
            {id: 1, name: 'C'},
            {id: 2, name: 'A'},
            {id: 3, name: 'B'},
        ])

        expect(sortByKey(unsortedPeople, "name")).toStrictEqual([
            {id: 2, name: 'A'},
            {id: 3, name: 'B'},
            {id: 1, name: 'C'},
        ])
    })
})
