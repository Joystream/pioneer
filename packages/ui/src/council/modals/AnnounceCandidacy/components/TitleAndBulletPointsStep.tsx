import React from 'react'
import * as Yup from 'yup'

import { InputComponent, InputText } from '@/common/components/forms'
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

type StringType = 'title' | 'bulletPoint'

const typeLength: { [key in StringType]: number } = { title: 60, bulletPoint: 120 }

const FormSchema = Yup.object().shape({})

export const TitleAndBulletPointsStep = ({
  title,
  bulletPoints,
  setTitle,
  setBulletPoints,
}: TitleAndBulletPointsStepProps) => {
  const formInitializer: FormFields = {
    title,
    bulletPoint1: bulletPoints[0],
    bulletPoint2: bulletPoints[1],
    bulletPoint3: bulletPoints[2],
  }
  const { fields, changeField } = useForm<FormFields>(formInitializer, FormSchema)

  const setValue = (field: keyof FormFields, value: any) => {
    switch (field) {
      case 'title':
        setTitle(!value || isValidString(value, 'title') ? value : undefined)
        break
      case 'bulletPoint1':
      case 'bulletPoint2':
      case 'bulletPoint3': {
        const points = [fields.bulletPoint1, fields.bulletPoint2, fields.bulletPoint3].map((point, index) =>
          index + 1 === Number(field.replace('bulletPoint', '')) ? value : point
        )
        const values = points.filter(
          (bulletPoint) => bulletPoint && !!bulletPoint?.trim() && isValidString(bulletPoint, 'bulletPoint')
        ) as string[]
        setBulletPoints(values)
      }
    }

    changeField(field, value)
  }

  const isValidString = (str: string, type: StringType) => str.length <= typeLength[type]
  const getStringMessage = (str: string | undefined, type: StringType) => {
    if (str && !isValidString(str, type)) {
      return `Maximum length is ${typeLength[type]} symbols.`
    }
  }

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Candidate profile</h4>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Profile title"
            required
            inputSize="s"
            validation={fields.title && !isValidString(fields.title, 'title') ? 'invalid' : undefined}
            message={getStringMessage(fields.title, 'title')}
          >
            <InputText id="title" value={fields.title} onChange={(event) => setValue('title', event.target.value)} />
          </InputComponent>
          <InputComponent
            label="Bullet points"
            inputSize="s"
            required
            validation={
              fields.bulletPoint1 && !isValidString(fields.bulletPoint1, 'bulletPoint') ? 'invalid' : undefined
            }
            message={getStringMessage(fields.bulletPoint1, 'bulletPoint')}
          >
            <InputText
              id="bulletPoint1"
              value={fields.bulletPoint1}
              onChange={(event) => setValue('bulletPoint1', event.target.value)}
            />
          </InputComponent>
          <InputComponent
            inputSize="s"
            validation={
              fields.bulletPoint2 && !isValidString(fields.bulletPoint2, 'bulletPoint') ? 'invalid' : undefined
            }
            message={getStringMessage(fields.bulletPoint2, 'bulletPoint')}
          >
            <InputText
              id="bulletPoint2"
              value={fields.bulletPoint2}
              onChange={(event) => setValue('bulletPoint2', event.target.value)}
            />
          </InputComponent>
          <InputComponent
            inputSize="s"
            validation={
              fields.bulletPoint3 && !isValidString(fields.bulletPoint3, 'bulletPoint') ? 'invalid' : undefined
            }
            message={getStringMessage(fields.bulletPoint3, 'bulletPoint')}
          >
            <InputText
              id="bulletPoint3"
              value={fields.bulletPoint3}
              onChange={(event) => setValue('bulletPoint3', event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
