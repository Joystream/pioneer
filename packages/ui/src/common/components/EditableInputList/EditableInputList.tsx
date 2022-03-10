import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

import { ButtonBareGhost } from '@/common/components/buttons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { InputComponent, InputNotification, InputText, ToggleCheckbox } from '@/common/components/forms'
import { BinIcon } from '@/common/components/icons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { TextHuge, TextMedium } from '@/common/components/typography'

export interface EditableInputListProps {
  title?: string
  buttonText: string
  onChange: (value: boolean) => void
}

const EditableInputList: React.FC<EditableInputListProps> = React.memo(({ title, buttonText }) => {
  const [questionFields, addQuestionField] = useState([{ questionField: '', shortValue: true, inputNumber: 0 }])

  const addFields = () => {
    const values = [...questionFields]
    values.push({ questionField: '', shortValue: true, inputNumber: 1 })
    addQuestionField(values)
  }

  const removeFields = (index: number) => {
    const values = [...questionFields]
    values.splice(index, 1)
    addQuestionField(values)
  }

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const values = [...questionFields]
    values[index].questionField = event.target.value
    addQuestionField(values)
  }

  const toggleLength = (index: number, shortValue: boolean) => {
    const values = [...questionFields]
    values[index].shortValue = shortValue
    addQuestionField(values)
  }

  return (
    <>
      <HeaderWrapper>
        <TextHuge>{title}</TextHuge>
        <TransactionButton style="primary" size="medium" onClick={() => addFields()}>
          <PlusIcon />
          {buttonText}
        </TransactionButton>
      </HeaderWrapper>
      {questionFields.map((questionFields, index) => (
        <InputWrapper>
          <QuestionFieldWrapper>
            <StyledNumber>{index + 1}.</StyledNumber>
            <StyledInputComponent
              id="field-title"
              inputSize="m"
              required
              message={questionFields.questionField.length > 50 ? 'Max length is 55 characters' : 'MAX 55'}
              validation={questionFields.questionField.length > 50 ? 'invalid' : undefined}
            >
              <InputText
                id="field-question"
                value={questionFields.questionField}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Type question"
              />
            </StyledInputComponent>
            <DeleteButtonWrapper onClick={() => removeFields(index)} size="small" square>
              <DeleteIcon />
            </DeleteButtonWrapper>
          </QuestionFieldWrapper>
          <ToggleWrapper>
            <ToggleCheckbox
              trueLabel={questionFields.shortValue ? <StyledLabel>Short answer</StyledLabel> : 'Short answer'}
              falseLabel={!questionFields.shortValue ? <StyledLabel>Long answer</StyledLabel> : 'Long answer'}
              onChange={() => toggleLength(index, !questionFields.shortValue)}
              checked={questionFields.shortValue ?? false}
              hasNoOffState
            />
          </ToggleWrapper>
        </InputWrapper>
      ))}
    </>
  )
})

export default EditableInputList

const StyledNumber = styled(TextHuge)`
  padding: 10px;
`

const InputWrapper = styled.div`
  margin-top: 40px;
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const DeleteButtonWrapper = styled(ButtonBareGhost)`
  padding-top: 20px;
`

const DeleteIcon = styled(BinIcon)`
  height: 16px;
  width: 16px;
`

const StyledInputComponent = styled(InputComponent)<{ validation?: string | undefined }>`
  ${InputNotification} {
    justify-content: ${({ validation }) => validation === undefined && 'end'};
  }
`

const QuestionFieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 35px;
`

const StyledLabel = styled(TextMedium)`
  font-weight: 900;
`
