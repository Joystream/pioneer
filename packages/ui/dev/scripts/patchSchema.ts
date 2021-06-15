import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const patchSchema = async () => {
  const schemaPath = join(__dirname, '..', '..', 'src', 'common', 'api', 'schemas', 'schema.graphql')
  let schemaContent = await readFileSync(schemaPath, 'utf-8')

  schemaContent = schemaContent.replace(/\b(implements)\b(.*?),((\s*).*?,)?/g, '$1$2 &$3')
  await writeFileSync(schemaPath, schemaContent, { encoding: 'utf-8' })
}

patchSchema()
