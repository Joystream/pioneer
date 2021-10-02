import React from 'react'

import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'

interface TitleAndBulletPointsStepProps {
  title?: string
  bulletPoints: string[]
  setTitle: (title?: string) => void
  setBulletPoints: (bulletPoints: string[]) => void
}

export const TitleAndBulletPointsStep = ({
  title,
  bulletPoints,
  setTitle,
  setBulletPoints,
}: TitleAndBulletPointsStepProps) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Candidate profile</h4>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Profile title" required inputSize="s">
            <InputText value={title} onChange={(event) => setTitle(event.target.value)} />
          </InputComponent>
          <InputComponent label="Bullet points" inputSize="s">
            <InputText value={title} onChange={(event) => setTitle(event.target.value)} />
          </InputComponent>
          <InputComponent inputSize="s">
            <InputText value={title} onChange={(event) => setTitle(event.target.value)} />
          </InputComponent>
          <InputComponent inputSize="s">
            <InputText value={title} onChange={(event) => setTitle(event.target.value)} />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
