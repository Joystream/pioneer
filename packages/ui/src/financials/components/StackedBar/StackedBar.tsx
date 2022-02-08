import React, { useState } from 'react'
import styled from 'styled-components'

import { HorizontalStackedBar } from '@/common/components/HorizontalStackedBar'
import { TextBig, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { DataListItem } from '@/financials/components/StackedBar/components/DataListItem'
import { chartColors } from '@/financials/types/constants'
import { List } from '@/common/components/List'

const data = {
  Dog: 1000,
  Cat: 100,
  Rat: 200,
}

const keys = ['Dog', 'Cat', 'Rat']
const keysConst = [...keys] as const

export const StackedBar = () => {
  const [active, setActive] = useState<typeof keysConst[number] | null>(null)
  const [preview, setPreview] = useState<typeof keysConst[number] | null>(null)

  return (
    <Wrapper>
      <TitleContainer>
        <TextBig value bold>
          Total funds locked
        </TextBig>
        <TokenValue value={1000000} size="l" />
      </TitleContainer>
      <HorizontalStackedBar
        keys={keys}
        data={data}
        height={50}
        tooltip={() => <div />}
        onMouseLeave={() => setPreview(null)}
        onMouseEnter={(node) => setPreview(node.id as typeof keysConst[number])}
        onBarClick={(node) => setActive(node.id as typeof keysConst[number])}
      />
      <List as="div">
        {Object.entries(data).map((item, index) => {
          const [key, value] = item
          return (
            <DataListItem
              key={item[0]}
              onClick={() => setActive(key)}
              isPreview={preview === key}
              isActive={active === key}
              title={key}
              color={chartColors[index]}
              percentage={(value / 1300) * 100}
              value={<TokenValue value={value} />}
            />
          )
        })}
      </List>
      {active && <Content>4</Content>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  padding: 20px;
  border: 1px solid ${Colors.Black[100]};

  > *:nth-child(1) {
    grid-column: 1/3;
  }

  > *:nth-child(2) {
    grid-column: 1/3;
  }
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Content = styled.div`
  width: 100%;
  background-color: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
`
