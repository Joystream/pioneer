import BN from 'bn.js'
import * as React from 'react'
import styled from 'styled-components'

import { InputComponent, InputNumber, ToggleCheckbox } from '@/common/components/forms'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { inBlocksDate } from '@/common/model/inBlocksDate'

export interface InputValues {
  isLimited: boolean
  length: number
}

export interface OpeningDurationProps {
  label: string
  value: InputValues
  onChange: (value: InputValues) => void
}

const OpeningDuration: React.FC<OpeningDurationProps> = React.memo(({ label, value, onChange }) => {
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
            {value.isLimited ? <StyledLabel>Limited</StyledLabel> : 'Limited'}
          </LabelWrapper>
        }
        falseLabel={!value.isLimited ? <StyledLabel>Unlimited</StyledLabel> : 'Unlimited'}
        onChange={() => onChange({ ...value, isLimited: !value.isLimited })}
        checked={value.isLimited}
        hasNoOffState
      />
      {value.isLimited && (
        <InputWrapper>
          <InputComponent
            label={label}
            id="field-periodLength"
            required
            units="blocks"
            inputSize="m"
            message={value ? `≈ ${inBlocksDate(new BN(value.length))}` : ''}
            tight
          >
            <InputNumber
              id="field-periodLength"
              placeholder="type number of blocks here"
              value={value?.length.toString()}
              onChange={(_, length) => onChange({ ...value, length })}
            />
          </InputComponent>
        </InputWrapper>
      )}
    </>
  )
})

export default OpeningDuration

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
