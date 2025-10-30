export function fuzzyMatches<T extends Record<string, any>>(list: T[], key: keyof T, search: string): T[] {
  return list
    .map((obj) => {
      const matches: any[] = Array.isArray(obj[key]) ? obj[key] : [obj[key]]
      return matches.map((match): [number, T] => [fuzzyMatch(String(match), search), obj]).sort(([a], [b]) => b - a)[0]
    })
    .filter(([score]) => score > 0)
    .sort(([a], [b]) => b - a)
    .map(([, match]) => match)
}

export function fuzzyMatch(match: string, search: string): number {
  const { score } = search.split('').reduce(
    ({ score, position, matchedLast }, char) => {
      const index = match.indexOf(char, position)
      return {
        score: score + getScoreUpdate(index, position, matchedLast),
        position: index >= 0 ? index + 1 : position,
        matchedLast: index >= 0,
      }
    },
    { score: 0, position: 0, matchedLast: true }
  )

  return Math.max(0, score)
}

function getScoreUpdate(index: number, position: number, matchedLast: boolean): number {
  if (index < 0) {
    // Didn't match any character
    return -3
  }

  if (!matchedLast || index - position > 0) {
    // Matched a character
    return 1
  }

  if (index > 0) {
    // Matched consecutive characters
    return 2
  }

  // Matched first letter
  return 3
}
