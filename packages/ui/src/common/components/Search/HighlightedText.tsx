import React, { memo, ReactElement } from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'
import { isString } from '@/common/utils'

type Node = ReactElement | string

interface HighlightedTextProps {
  pattern: RegExp | null
  children: string
}
export const HighlightedText = memo(({ pattern, children }: HighlightedTextProps) => (
  <>
    {(pattern ? [...children.matchAll(pattern)] : []).reduceRight(
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
    )}
  </>
))

const HighlightedWord = styled.span`
  background-color: ${Colors.Black[200]};
  color: ${Colors.Black[900]};
`
