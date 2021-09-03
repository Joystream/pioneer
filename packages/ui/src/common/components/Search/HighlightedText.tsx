import React, { memo, ReactElement } from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'
import { isString } from '@/common/utils'

type Node = ReactElement | string

interface HighlightedTextProps {
  pattern?: RegExp | null
  shorten?: boolean
  children: string
}
export const HighlightedText = memo(({ pattern = null, shorten, children }: HighlightedTextProps) => {
  if (!pattern) {
    return <>{children}</>
  }

  const nodes = [...children.matchAll(pattern)].reduceRight(
    ([node, ...nodes]: Node[], match, index): Node[] => {
      if (!isString(node)) return [node, ...nodes]

      const start = match.index ?? 0
      const end = start + match[0].length
      return [
        node.slice(0, start),
        <HighlightedWord key={index}>{node.slice(start, end)}</HighlightedWord>,
        node.slice(end),
        ...nodes,
      ]
    },
    [children]
  )

  if (shorten) {
    return (
      <>
        {nodes.map((node, index, { length }) => {
          if (!isString(node) || node.length < 50) {
            return node
          } else if (index === 0) {
            return `... ${getEnd(node)}`
          } else if (index === length - 1) {
            return `${getStart(node)} ...`
          } else {
            return `${getStart(node)} ... ${getEnd(node)}`
          }
        })}
      </>
    )
  } else {
    return <>{nodes}</>
  }
})

const HighlightedWord = styled.span`
  background-color: ${Colors.Blue[100]};
  color: ${Colors.Black[900]};
`

const getStart = (text: string, limit = 30) => {
  const longest = text.slice(0, limit)
  const index = Math.min(
    limit,
    ...[
      longest.indexOf(' ', longest.indexOf(' ', longest.indexOf(' ') + 1) + 1) - 1,
      longest.indexOf('.'),
      longest.indexOf(','),
    ].filter((index) => index >= 0)
  )

  return index < limit ? longest.slice(0, 1 + index) : longest
}

const getEnd = (text: string, limit = 30) => {
  const longest = text.slice(-limit)
  const index = Math.max(
    0,
    longest.lastIndexOf(' ', longest.lastIndexOf(' ', longest.lastIndexOf(' ') - 1) - 1),
    longest.lastIndexOf('.') + 1,
    longest.lastIndexOf(',') + 1
  )

  return index > 0 ? longest.slice(index - limit + 1) : longest
}
