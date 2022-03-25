import React from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonGhost } from '@/common/components/buttons'
import { BellIcon } from '@/common/components/icons/BellIcon'
// todo TODO: https://github.com/Joystream/pioneer/issues/1937
export const BountyNotifyButton = React.memo(() => {
  const { t } = useTranslation('bounty')

  return (
    <ButtonGhost size="large">
      <BellIcon /> {t('common:buttons.notifyAboutChanges')}
    </ButtonGhost>
  )
})
