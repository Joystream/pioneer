import styled from 'styled-components'

interface StatisticsLayoutProps {
  withMargin?: boolean
  gapSize?: 's' | 'm'
}

export const Statistics = styled.div<StatisticsLayoutProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(238px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 100%;
  ${({ withMargin }) => (withMargin ? 'margin-top: 8px;' : null)};
  @media (min-width: 1440px) {
    gap: ${({ gapSize }) => (gapSize === 's' ? '16px' : '24px')};
  }
`

export const StatisticsThreeColumns = styled.div<StatisticsLayoutProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${({ gapSize }) => (gapSize === 's' ? '16px' : '24px')};
  width: 100%;
  max-width: 100%;
  ${({ withMargin }) => (withMargin ? 'margin-top: 8px;' : null)};
`
