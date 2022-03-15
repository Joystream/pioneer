import * as React from 'react'
import styled from 'styled-components'

import { InputComponent, InputNumber, ToggleCheckbox } from '@/common/components/forms'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { inBlocksDate } from '@/common/model/inBlocksDate'

export interface OpeningDurationValue {
  isLimited: boolean
  length: number | undefined
}

export interface OpeningDurationProps {
  label: string
  value: OpeningDurationValue | undefined
  onChange: (value: OpeningDurationValue) => void
}

export const OpeningDuration: React.FC<OpeningDurationProps> = React.memo(({ label, value, onChange }) => {
  const isLimited = value?.isLimited ?? true
  const length = value?.length
  return (
    <>
      <ToggleCheckbox
        trueLabel={
          <LabelWrapper>
            <TooltipWrapper>
              <Tooltip tooltipText="Applications can be made and used for filling the role even after this date expires.">
                <TooltipDefault />
              </Tooltip>
            </TooltipWrapper>
            {isLimited ? <StyledLabel>Limited</StyledLabel> : 'Limited'}
          </LabelWrapper>
        }
        falseLabel={!isLimited ? <StyledLabel>Unlimited</StyledLabel> : 'Unlimited'}
        onChange={() => onChange({ isLimited: !isLimited, length })}
        checked={isLimited}
        hasNoOffState
      />
      {isLimited && (
        <InputWrapper>
          <InputComponent
            label={label}
            id="field-period-length"
            required
            units="blocks"
            inputSize="m"
            message={value?.length ? `≈ ${inBlocksDate(value.length)}` : ''}
            tight
          >
            <InputNumber
              id="field-period-length"
              placeholder="type number of blocks here"
              value={value?.length?.toString()}
              onChange={(_, length) => onChange({ isLimited, length: length || undefined })}
            />
          </InputComponent>
        </InputWrapper>
      )}
    </>
  )
})

const StyledLabel = styled(TextMedium)`
  font-weight: 900;
  display: flex;
`
const TooltipWrapper = styled.div`
  padding-right: 10px;
`

const LabelWrapper = styled.div`
  display: flex;
`

const InputWrapper = styled.div`
  padding-top: 20px;
`
