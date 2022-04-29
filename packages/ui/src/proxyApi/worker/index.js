export const workerApi = () => new Worker(new URL('./worker', import.meta.url))
