export const spacing = (spacing: number, horizontalSpacing?: number): string => {
  if (!horizontalSpacing) return `${spacing * 8}px`
  return `${spacing * 8}px ${horizontalSpacing * 8}px`
}
