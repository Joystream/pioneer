import * as React from 'react'
import { useFormContext } from 'react-hook-form'
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
}

export const OpeningDuration = React.memo(({ label }: OpeningDurationProps) => {
  const { watch } = useFormContext()
  const [isLimited, length] = watch(['durationAndProcess.isLimited', 'durationAndProcess.length'])
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
        name="durationAndProcess.isLimited"
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
            message={length?.length ? `≈ ${inBlocksDate(length.length)}` : ''}
            tight
          >
            <InputNumber
              id="field-period-length"
              placeholder="type number of blocks here"
              name="durationAndProcess.length"
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
