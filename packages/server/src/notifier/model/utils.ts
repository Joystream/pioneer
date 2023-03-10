import { uniq } from 'lodash'

export const toNumbers = (list: (number | string)[]) => list.map(Number).filter((item) => !isNaN(item))

export const itemsExcept = <T, K extends string, O extends { [k in K]: T }>(list: O[], key: K, except: T): T[] =>
  list.flatMap((item: O) => (item[key] === except ? [] : [item[key]]))

type Created = { createdAt: any }
export const isOlderThan =
  <A extends Created>(a: A) =>
  <B extends Created>(b: B): boolean =>
    Date.parse(String(a)) > Date.parse(String(b))

// TODO improve this logic
export const mentionedMembersIdsFromText = (text: string): number[] =>
  uniq(Array.from(text.matchAll(/\[@\w+\]\(#mention\?member-id=(\d+)\)/g)).map(([, id]) => Number(id)))
