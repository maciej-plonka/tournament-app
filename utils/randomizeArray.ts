export function randomizeArray<T>(initialArray: ReadonlyArray<T>): ReadonlyArray<T> {
    return [...initialArray].sort(() => Math.random() - 0.5);
}
