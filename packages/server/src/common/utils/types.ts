export type Subset<SuperSet, T extends SuperSet> = Exclude<keyof T, keyof SuperSet> extends never ? T : never

export type DocWithFragments<T> = T extends { ' $fragmentRefs': any } ? T : never
