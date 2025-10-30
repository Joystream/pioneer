export const maskFragment =
  <F extends string, TN extends string>(fragment: F, __typename: TN) =>
  <T extends Record<string, any>>(data: Omit<T, '__typename'>) =>
    ({ __typename, ' $fragmentRefs': { [`${fragment}Fragment`]: { ...data, __typename } as unknown as T } } as {
      __typename: TN
      ' $fragmentRefs': { [f in `${F}Fragment`]: T }
    })
