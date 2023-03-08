export type DocWithFragments<T> = T extends { ' $fragmentRefs': any } ? T : never
