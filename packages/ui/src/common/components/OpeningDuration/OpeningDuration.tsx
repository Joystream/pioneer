import BN from 'bn.js'
import * as React from 'react'
import styled from 'styled-components'

import { InputComponent, InputNumber, ToggleCheckbox } from '@/common/components/forms'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { useToggle } from '@/common/hooks/useToggle'
import { inBlocksDate } from '@/common/model/inBlocksDate'

export interface OpeningDurationProps {
  title: string
  setHiringPeriodLength: (hiringPeriodLength: BN) => void
  hiringPeriodLength: BN
}

const OpeningDuration: React.FC<OpeningDurationProps> = React.memo(
  ({ title, hiringPeriodLength = new BN(43200), setHiringPeriodLength }) => {
    const [durationLength, setDurationLength] = useToggle(true)

    return (
      <>
        <StyledTitle>{title}</StyledTitle>
        <ToggleCheckbox
          trueLabel={
            <LabelWrapper>
              <TooltipWrapper>
                <Tooltip tooltipText="Applications can be made and used for filling the role even after this date expires.">
                  <TooltipDefault />
                </Tooltip>
              </TooltipWrapper>
              {durationLength ? <StyledLabel>Limited</StyledLabel> : 'Limited'}
            </LabelWrapper>
          }
          falseLabel={!durationLength ? <StyledLabel>Unlimited</StyledLabel> : 'Unlimited'}
          onChange={() => setDurationLength()}
          checked={durationLength ?? false}
          hasNoOffState
        />
        {durationLength && (
          <InputWrapper>
            <InputComponent
              label="Hiring period length"
              id="field-periodLength"
              required
              units="blocks"
              inputSize="m"
              message={hiringPeriodLength ? `≈ ${inBlocksDate(hiringPeriodLength)}` : ''}
              tight
            >
              <InputNumber
                id="field-periodLength"
                placeholder="0"
                value={hiringPeriodLength.toString()}
                onChange={(_, numberValue) => setHiringPeriodLength(new BN(numberValue))}
              />
            </InputComponent>
          </InputWrapper>
        )}
      </>
    )
  }
)

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

const StyledTitle = styled(TextHuge)`
  padding-bottom: 20px;
`
