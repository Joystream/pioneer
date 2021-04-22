// Defined by the webpack configuration
declare const GIT_VERSION: string
declare const IS_DEVELOPMENT: boolean

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}

declare module 'MarkdownEditor' {}
