import styled from 'styled-components'

export const PageContent = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  grid-area: page;
  padding: 40px 0;
`

export const ContentWithSidepanel = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 280px;
  width: 100%;
  height: 100%;
  max-height: fit-content;
`

export const MainPanel = styled.div`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
  height: fit-content;
`

export const ContentWithTabs = styled(MainPanel)`
  grid-row-gap: 16px;
`

interface GapBlockProps {
  gap?: number
  align?: 'left' | 'right' | 'none'
  alignCenter?: boolean
}

export const RowGapBlock = styled.div<GapBlockProps>`
  display: grid;
  grid-row-gap: ${({ gap }) => (gap ? gap + 'px' : '0px')};
  width: 100%;
  height: fit-content;
  justify-content: ${({ align }) => align !== 'none' && (align === 'right' ? 'end' : 'start')};
  justify-items: ${({ align }) => align !== 'none' && (align === 'right' ? 'end' : 'start')};
`
export const ColumnGapBlock = styled.div<GapBlockProps>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${({ gap }) => (gap ? gap + 'px' : '16px')};
  width: fit-content;
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : 'start')};
`

export const PageFooter = styled.footer`
  display: grid;
  position: absolute;
  bottom: 8px;
  grid-auto-flow: column;
  grid-column-gap: 48px;
  align-items: center;
  width: fit-content;
`
