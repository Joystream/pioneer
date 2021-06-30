import { css, FlattenSimpleInterpolation } from 'styled-components'

import { isDefined } from '@/common/utils'

export const spacing = (spacing: number, horizontalSpacing?: number): string => {
  if (!isDefined(horizontalSpacing)) return `${spacing * 8}px`
  return `${spacing * 8}px ${horizontalSpacing * 8}px`
}

export const size = (width: string, height?: string): FlattenSimpleInterpolation => {
  if (!isDefined(height))
    return css`
      width: ${width};
      height: ${width};
    `
  return css`
    width: ${width};
    height: ${height};
  `
}
