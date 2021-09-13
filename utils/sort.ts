type SortableProvider<T> = (value: T) => Sortable

type Sortable = number | string

type SortableKeys<Type> = keyof {
    [Property in keyof Type as Type[Property] extends Sortable ? Property : never]: Type[Property]
}

export function sort<T extends Sortable>(array: ReadonlyArray<T>): ReadonlyArray<T> {
    return [...array].sort(compare);
}

export function sortBy<T>(array: ReadonlyArray<T>, valueProvider: SortableProvider<T>): ReadonlyArray<T> {
    return [...array].sort((left, right) => {
        const leftValue = valueProvider(left);
        const rightValue = valueProvider(right);
        return compare(leftValue, rightValue);
    });
}

export function sortByKey<T extends { [_: string]: any }>(array: ReadonlyArray<T>, key: SortableKeys<T>): ReadonlyArray<T> {
    return [...array].sort((left, right) => {
        if (!isKeyOf(key, left) || !isKeyOf(key, right)) {
            return 0;
        }
        const leftValue = left[key] as Sortable
        const rightValue = right[key] as Sortable
        return compare(leftValue, rightValue)
    });
}

function isKeyOf<T extends {}>(key: any, anObject: T): key is keyof T {
    return anObject.hasOwnProperty(key);
}


function compare(left: Sortable, right: Sortable): number {
    if (typeof left == 'number' && typeof right == 'number')
        return left - right
    if (typeof left == 'string' && typeof right == 'string')
        return left.localeCompare(right)
    return 0;
}

