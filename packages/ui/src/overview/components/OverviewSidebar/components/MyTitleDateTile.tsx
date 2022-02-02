import React from 'react'
import styled from 'styled-components'

import { TextBig } from '@/common/components/typography'
import { Shadows } from '@/common/constants'

export const MyTitleDateTile = ({ title }: { title: string }) => {
  return (
    <Tile>
      <TextBig value bold>
        {title}
      </TextBig>
    </Tile>
  )
}

const Tile = styled.div`
  min-width: 216px;
  width: fit-content;
  padding: 20px;
  height: 114px;
  box-shadow: ${Shadows.light};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 5px;
`
