export function createBatches<T>(data: ReadonlyArray<T>, batchSize: number): ReadonlyArray<ReadonlyArray<T>> {
    if (batchSize <= 0) throw Error(`Invalid batchSize: ${batchSize}`)
    const batches: ReadonlyArray<T>[] = [];
    for (let i = 0; i < data.length; i += batchSize) {
        batches.push(data.slice(i, i + batchSize));
    }
    return batches;
}
