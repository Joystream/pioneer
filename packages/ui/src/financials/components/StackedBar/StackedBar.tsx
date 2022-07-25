import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { HorizontalStackedBar } from '@/common/components/HorizontalStackedBar'
import { List } from '@/common/components/List'
import { TextBig, TextMedium, ValueInJoys } from '@/common/components/typography'
import { formatTokenValue } from '@/common/model/formatters'
import { DataListItem } from '@/financials/components/StackedBar/components/DataListItem'
import { chartColors } from '@/financials/types/constants'

export type Data = Record<string, number> // NOTE Currently does not support JOY values

export interface StackedBarProps {
  data: Data
  title: string
  active?: string | number
  setActive?: (key: string | number) => void
  barHeight?: number
  haveHover?: boolean
}

const TokenValue = ({ value, size }: { value: number; size?: 'l' }) => (
  <ValueInJoys size={size}>{formatTokenValue(value)}</ValueInJoys>
)

export const StackedBar = ({ data, title, active, setActive, haveHover = true, barHeight = 50 }: StackedBarProps) => {
  const [preview, setPreview] = useState<number | string | null>(null)
  const totalValue = useMemo(() => Object.values(data).reduce((prev, next) => prev + next), [data])

  return (
    <>
      <TitleContainer>
        <TextBig value bold>
          {title}
        </TextBig>
        <TokenValue value={totalValue || 0} size="l" />
      </TitleContainer>
      <HorizontalStackedBar
        keys={Object.keys(data)}
        data={data}
        height={barHeight}
        tooltip={(node) => (
          <Tooltip>
            <TextMedium value>{node.id}</TextMedium>
          </Tooltip>
        )}
        onMouseLeave={() => setPreview(null)}
        onMouseEnter={(node) => setPreview(node.id)}
        onBarClick={(node) => setActive?.(node.id)}
      />
      <StyledList as="div">
        {Object.entries(data).map((item, index) => {
          const [key, value] = item
          return (
            <DataListItem
              key={item[0]}
              onClick={() => setActive?.(key)}
              isPreview={haveHover && preview === key}
              isActive={active === key}
              title={key}
              color={chartColors[index]}
              percentage={(value / (totalValue || 1)) * 100}
              value={<TokenValue value={value} />}
              haveHover={haveHover}
            />
          )
        })}
      </StyledList>
    </>
  )
}

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledList = styled(List)`
  row-gap: 1px;
`

const Tooltip = styled.div`
  padding: 5px 10px;
  background-color: rgba(31, 37, 46, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  color: #fff;
`
