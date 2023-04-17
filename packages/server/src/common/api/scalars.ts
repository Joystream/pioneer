import { GraphQLError, Kind, ValueNode } from 'graphql'
import { omit } from 'lodash'
import { scalarType } from 'nexus'

const valueFromAST = (ast: ValueNode): any => {
  switch (ast.kind) {
    case Kind.OBJECT:
      return Object.fromEntries(ast.fields.map(({ name, value }) => [name, valueFromAST(value)]))
    case Kind.LIST:
      return ast.values.map(valueFromAST)
    default:
      return Object.values(omit(ast, 'kind', 'lock'))[0] ?? null
  }
}
const astToString = (ast: ValueNode): string => JSON.stringify(valueFromAST(ast))

export const BigIntScalar = scalarType({
  name: 'BigInt',
  asNexusMethod: 'bigint',
  description: 'Custom BigInt scalar type',
  parseValue: Number,
  serialize: Number,
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(`BigInt cannot represent non-integer value: ${astToString(ast)}`)
    }
    return ast.value
  },
})
