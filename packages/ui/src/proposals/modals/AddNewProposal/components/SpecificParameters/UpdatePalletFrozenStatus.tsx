import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  InlineToggleWrap,
  InputNotification,
  InputNotificationIcon,
  InputNotificationMessage,
  Label,
  ToggleCheckbox,
} from '@/common/components/forms'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { enhancedGetErrorMessage } from '@/common/utils/validation'

export const UpdatePalletFrozenStatus = () => {
  const { watch, formState } = useFormContext()
  const validationMessage = useMemo(() => {
    return enhancedGetErrorMessage(formState?.errors)('updatePalletFrozenStatus.enable') ?? ''
  }, [JSON.stringify(formState?.errors), watch('updatePalletFrozenStatus.enable')])
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
          <Label>Creator Tokens</Label>
          <ToggleCheckbox falseLabel="Disable" trueLabel="Enable" name="updatePalletFrozenStatus.enable" />
          <Tooltip tooltipText="You have the flexibility to enable or disable CRT feature.">
            <TooltipDefault />
          </Tooltip>
        </InlineToggleWrap>
        {validationMessage && (
          <InputNotification validation={'invalid'}>
            <InputNotificationIcon>
              <AlertSymbol />
            </InputNotificationIcon>
            <InputNotificationMessage>{validationMessage}</InputNotificationMessage>
          </InputNotification>
        )}
      </Row>
    </RowGapBlock>
  )
}
