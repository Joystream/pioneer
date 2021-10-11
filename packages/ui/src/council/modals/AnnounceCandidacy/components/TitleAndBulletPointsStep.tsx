import React, { useEffect } from 'react'
import * as Yup from 'yup'

import { InputComponent, InputText } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useForm } from '@/common/hooks/useForm'

interface TitleAndBulletPointsStepProps {
  title?: string
  bulletPoints: string[]
  setTitle: (title?: string) => void
  setBulletPoints: (bulletPoints: string[]) => void
}

interface FormFields {
  title?: string
  bulletPoint1?: string
  bulletPoint2?: string
  bulletPoint3?: string
}

const FormSchema = Yup.object().shape({
  title: Yup.string().trim().max(60, 'Maximum length is 60 symbols.'),
  bulletPoint1: Yup.string().trim().max(120, 'Maximum length is 120 symbols.'),
  bulletPoint2: Yup.string().trim().max(120, 'Maximum length is 120 symbols.'),
  bulletPoint3: Yup.string().trim().max(120, 'Maximum length is 120 symbols.'),
})

const getBulletPoints = (fields: FormFields) => {
  return Object.entries(fields)
    .filter(([field, value]) => field.startsWith('bulletPoint') && value)
    .map(([, value]) => value)
}

export const TitleAndBulletPointsStep = ({
  title,
  bulletPoints,
  setTitle,
  setBulletPoints,
}: TitleAndBulletPointsStepProps) => {
  const formInitializer: FormFields = {
    title: title || '',
    bulletPoint1: bulletPoints[0] || '',
    bulletPoint2: bulletPoints[1] || '',
    bulletPoint3: bulletPoints[2] || '',
  }
  const { fields, changeField, validation } = useForm<FormFields>(formInitializer, FormSchema)

  useEffect(() => {
    setTitle(validation.isValid ? fields.title : undefined)
    setBulletPoints(validation.isValid ? getBulletPoints(fields) : [])
  }, [validation.isValid, JSON.stringify(fields)])

  return (
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
            validation={hasError('title', validation.errors) ? 'invalid' : undefined}
            message={hasError('title', validation.errors) ? getErrorMessage('title', validation.errors) : undefined}
          >
            <InputText id="title" value={fields.title} onChange={(event) => changeField('title', event.target.value)} />
          </InputComponent>
          <RowGapBlock gap={8}>
            {[1, 2, 3].map((index) => {
              const fieldName = ('bulletPoint' + index) as keyof FormFields

              return (
                <InputComponent
                  key={index}
                  inputSize="s"
                  label={index === 1 ? 'Bullet points' : undefined}
                  required={index === 1}
                  validation={hasError(fieldName, validation.errors) ? 'invalid' : undefined}
                  message={
                    hasError(fieldName, validation.errors) ? getErrorMessage(fieldName, validation.errors) : undefined
                  }
                >
                  <InputText
                    id={fieldName}
                    value={fields[fieldName]}
                    onChange={(event) => changeField(fieldName, event.target.value)}
                  />
                </InputComponent>
              )
            })}
          </RowGapBlock>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
