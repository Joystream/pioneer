export const mockUniqueQuery = <T extends { id: string }>(key: string, entities: T[]) =>
  jest.fn(({ variables, skip }) => {
    if (skip) return {}
    const { id } = variables.where
    const entity = entities.find((entity) => entity.id === id)
    return { isLoading: false, data: { [key]: entity } }
  })
