export function isNotNull<T>(value: T | undefined | null): value is T {
    return !!value;
}

export function isNotFalsy<T>(value: T | undefined | null | false): value is T {
    return !!value;
}
