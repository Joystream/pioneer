import React from 'react'
import styled from 'styled-components'

import { BlockInfoProp } from '@/common/components/BlockTime/BlockInfo'
import { BlockIcon } from '@/common/components/icons'
import { TextSmall } from '@/common/components/typography'
import { formatDateString, formatTokenValue } from '@/common/model/formatters'
import { spacing } from '@/common/utils/styles'

export const BlockDate = ({ block }: BlockInfoProp) => (
  <Container>
    <BlockNumber>
      <BlockIcon />
      {formatTokenValue(block.number)} block
    </BlockNumber>
    <DateField>{formatDateString(block.timestamp)}</DateField>
  </Container>
)

const Container = styled.div`
  text-align: end;
  width: fit-content;
  height: fit-content;
`
const BlockNumber = styled(TextSmall).attrs({ bold: true, light: true })`
  & > :first-child {
    margin-right: ${spacing(1)};
    vertical-align: middle;
  }
`
const DateField = styled(TextSmall).attrs({ lighter: true })`
  grid-row: 2;
`
