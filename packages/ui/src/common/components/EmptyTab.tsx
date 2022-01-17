import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'

export const EmptyTab = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <TextMedium light inter>
        {t('signInInfo')}
      </TextMedium>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`
