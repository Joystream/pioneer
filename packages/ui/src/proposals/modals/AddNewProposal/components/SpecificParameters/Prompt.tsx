import React from 'react'
import styled from 'styled-components'

import { QuestionIcon } from '@/common/components/icons'
import { BorderRad, Colors } from '@/common/constants'

export interface PromptProps {
  children: React.ReactNode
}

export const Prompt = ({ children }: PromptProps) => {
  return (
    <PromptContainer>
      <IconSection>
        <PromptQuestion>
          <QuestionIcon />
        </PromptQuestion>
      </IconSection>
      {children}
    </PromptContainer>
  )
}
const PromptContainer = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  border-left: 4px solid ${Colors.Blue[200]};
  color: ${Colors.Black[500]};
`
const IconSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const PromptQuestion = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: ${BorderRad.full};
  border: 1px solid ${Colors.Black[900]};
`
