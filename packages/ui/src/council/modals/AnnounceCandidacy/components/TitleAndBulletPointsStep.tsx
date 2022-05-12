import React from 'react'

import { InputComponent, InputText } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { ValidationHelpers } from '@/common/utils/validation'

export const TitleAndBulletPointsStep = ({ errorChecker, errorMessageGetter }: ValidationHelpers) => (
  <RowGapBlock gap={24}>
    <Row>
      <RowGapBlock gap={8}>
        <h4>Candidate profile</h4>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={40}>
        <InputComponent
          label="Profile title"
          required
          inputSize="s"
          validation={errorChecker('title') ? 'invalid' : undefined}
          message={errorChecker('title') ? errorMessageGetter('title') : ' '}
        >
          <InputText id="title" name="titleAndBulletPoints.title" />
        </InputComponent>
        <RowGapBlock gap={8}>
          {[1, 2, 3].map((index) => {
            const fieldName = 'bulletPoint' + index

            return (
              <InputComponent
                key={index}
                inputSize="s"
                label={index === 1 ? 'Bullet points' : undefined}
                required={index === 1}
                validation={errorChecker(fieldName) ? 'invalid' : undefined}
                message={errorChecker(fieldName) ? errorMessageGetter(fieldName) : ' '}
              >
                <InputText id={fieldName} name={'titleAndBulletPoints.' + fieldName} />
              </InputComponent>
            )
          })}
        </RowGapBlock>
      </RowGapBlock>
    </Row>
  </RowGapBlock>
)
