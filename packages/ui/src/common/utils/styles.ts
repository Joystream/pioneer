import { css, FlattenSimpleInterpolation } from 'styled-components'

export const spacing = (spacing: number, horizontalSpacing?: number): string => {
  if (!horizontalSpacing) return `${spacing * 8}px`
  return `${spacing * 8}px ${horizontalSpacing * 8}px`
}

export const size = (width: string, height?: string): FlattenSimpleInterpolation => {
  if (!height)
    return css`
      width: ${width};
      height: ${width};
    `
  return css`
    width: ${width};
    height: ${height};
  `
}
