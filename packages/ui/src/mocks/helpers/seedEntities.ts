export const seedOverridableEntities =
  <T>(rawEntities: T[], seedEntity: (server: any, entity: T) => any) =>
  (server: any, overrides?: Partial<T>[]): void => {
    const entities = overrides?.map((override, index) => ({ ...rawEntities[index], ...override })) ?? rawEntities
    entities.forEach((entity) => seedEntity(entity, server))
  }
