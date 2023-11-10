import React from 'react'

import { Option, OptionsListComponent } from '@/common/components/selects'

import { PalletFrozenStatus } from './UpdatePalletFrozenStatus'

interface Props {
  onChange: (option: PalletFrozenStatus) => void
}

export const OptionsPalletFrozenStatus = React.memo(({ onChange }: Props) => {
  return (
    <OptionsListComponent>
      <Option key={1} onClick={() => onChange('Enabled')}>
        Enabled
      </Option>
      <Option key={2} onClick={() => onChange('Disabled')}>
        Disabled
      </Option>
    </OptionsListComponent>
  )
})
