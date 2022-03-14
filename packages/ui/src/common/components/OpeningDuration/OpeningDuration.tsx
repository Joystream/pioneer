import BN from 'bn.js'
import * as React from 'react'
import styled from 'styled-components'

import { InputComponent, InputNumber, ToggleCheckbox } from '@/common/components/forms'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { useToggle } from '@/common/hooks/useToggle'
import { inBlocksDate } from '@/common/model/inBlocksDate'

export interface OpeningDurationProps {
  label: string
  onChange: (value: number) => void
  value: number
}

const OpeningDuration: React.FC<OpeningDurationProps> = React.memo(({ label, value, onChange }) => {
  const [isLimited, setIsLimited] = useToggle(true)
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
        onChange={() => setIsLimited()}
        checked={isLimited}
        hasNoOffState
      />
      {isLimited && (
        <InputWrapper>
          <InputComponent
            label={label}
            id="field-periodLength"
            required
            units="blocks"
            inputSize="m"
            message={value ? `≈ ${inBlocksDate(new BN(value))}` : ''}
            tight
          >
            <InputNumber
              id="field-periodLength"
              placeholder="type number of blocks here"
              value={value?.toString()}
              onChange={(_, numberValue) => onChange(numberValue)}
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
