import React from 'react'
import styled from 'styled-components'

import { RowGapBlock } from '@/common/components/page/PageContent'

export const NoData = ({ children }: { children: React.ReactNode }) => (
  <NoDataContainer gap={16}>{children}</NoDataContainer>
)

const NoDataContainer = styled(RowGapBlock)`
  place-self: center;
  justify-items: center;
  width: 420px;
  height: fit-content;
  margin-top: 172px;
  text-align: center;
`
