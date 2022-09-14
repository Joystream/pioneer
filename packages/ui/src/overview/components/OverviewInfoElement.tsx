import React from 'react'
import styled from 'styled-components'

import { Loader } from '@/common/components/icons'
import { TextHuge, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  value: React.ReactNode
  label: string
  isLoading?: boolean
}

export const OverviewInfoElement = ({ value, label, isLoading }: Props) => {
  return (
    <Wrapper>
      {isLoading ? (
        <LoadingBox>
          <Loader />
        </LoadingBox>
      ) : (
        <Value black bold value as="div">
          {value}
        </Value>
      )}
      <Label light>{label}</Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
`

const Value = styled(TextHuge)`
  margin-bottom: 12px;
`

const LoadingBox = styled.div`
  height: 28px;
  margin-bottom: 12px;
`

const Label = styled(TextSmall)`
  color: ${Colors.Black[500]};
`
