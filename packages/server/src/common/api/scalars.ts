import { Kind } from 'graphql'
import { scalarType } from 'nexus'

export const BigIntScalar = scalarType({
  name: 'BigInt',
  asNexusMethod: 'bigint',
  description: 'Custom BigInt scalar type',
  // TODO handle ERRORS
  parseValue: Number,
  serialize: Number,
  parseLiteral: (ast) => (ast.kind === Kind.INT ? Number(ast.value) : null),
})
