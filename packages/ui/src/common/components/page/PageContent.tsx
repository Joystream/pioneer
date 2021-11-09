import styled from 'styled-components'

export const PageContent = styled.div`
  position: relative;
  padding: 40px 24px 8px 0;
  margin-left: 24px;
`

export const ContentWithSidePanel = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 280px;
  width: 100%;
  height: 100%;
  max-height: fit-content;
`

export const MainPanel = styled.div`
  display: grid;
  position: relative;
  grid-row-gap: 24px;
  width: 100%;
  height: fit-content;
`

export const ContentWithTabs = styled(MainPanel)`
  grid-row-gap: 16px;
`

interface GapBlockProps {
  gap?: number
  align?: 'end' | 'center'
}

export const RowGapBlock = styled.div<GapBlockProps>`
  display: grid;
  grid-row-gap: ${({ gap }) => (gap ? gap + 'px' : '0px')};
  width: 100%;
  height: fit-content;
  justify-content: ${({ align }) => {
    if (align == 'end') {
      return 'end'
    } else if (align == 'center') {
      return 'center'
    } else {
      return undefined
    }
  }};
  justify-items: ${({ align }) => {
    if (align == 'end') {
      return 'end'
    } else if (align == 'center') {
      return 'center'
    } else {
      return undefined
    }
  }};
`
export const ColumnGapBlock = styled.div<GapBlockProps>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${({ gap }) => (gap ? gap + 'px' : '16px')};
  width: fit-content;
  align-items: ${({ align }) => (align == 'center' ? 'center' : 'start')};
`

export const PageFooter = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 48px;
  align-items: center;
  width: fit-content;
`
