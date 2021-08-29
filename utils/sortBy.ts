type Provider<T, R> = (value: T) => R

export function sortBy<T>(array: ReadonlyArray<T>, valueProvider: Provider<T, string> | Provider<T, number>): ReadonlyArray<T> {
    return [...array].sort((left, right) => {
        const leftValue = valueProvider(left);
        const rightValue = valueProvider(right);
        if (typeof leftValue == 'number' && typeof rightValue == 'number')
            return leftValue - rightValue
        if (typeof leftValue == 'string' && typeof rightValue == 'string')
            return leftValue.localeCompare(rightValue)
        return 0;
    });
}
