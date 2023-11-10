import React from 'react'

import { InlineToggleWrap, Label, ToggleCheckbox } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'

export type PalletFrozenStatus = 'Enabled' | 'Disabled'

export const UpdatePalletFrozenStatus = () => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>CRT feature management</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <InlineToggleWrap>
          <Label>CRT feature</Label>
          <Tooltip tooltipText="You have the flexibility to enable or disable CRT feature.">
            <TooltipDefault />
          </Tooltip>
        </InlineToggleWrap>
        <ToggleCheckbox
          falseLabel="Enabled"
          trueLabel="Disabled"
          name="updatePalletFrozenStatus.frozen"
          id="crt-feature-select"
        />
      </Row>
    </RowGapBlock>
  )
}
