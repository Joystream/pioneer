import React from 'react'
import { useFormContext } from 'react-hook-form'

import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

import { SelectPalletFrozenStatus } from './SelectPalletFrozenStatus'

export type PalletFrozenStatus = 'Enabled' | 'Disabled'

export const UpdatePalletFrozenStatus = () => {
  const { watch, setValue } = useFormContext()

  const setPalletFrozenStatus = (selected: PalletFrozenStatus) => {
    if (selected === 'Enabled') {
      setValue('updatePalletFrozenStatus.frozen', true, { shouldValidate: true })
    }
    if (selected === 'Disabled') {
      setValue('updatePalletFrozenStatus.frozen', false, { shouldValidate: true })
    }
  }
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>CRT feature management</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <InputComponent
          id="crt-feature-select"
          label="CRT feature"
          required
          inputSize="l"
          tooltipText="You have the flexibility to enable or disable CRT feature."
        >
          <SelectPalletFrozenStatus
            selectedStatus={watch('updatePalletFrozenStatus.frozen')}
            onChange={(selected) => setPalletFrozenStatus(selected)}
          />
        </InputComponent>
      </Row>
    </RowGapBlock>
  )
}
