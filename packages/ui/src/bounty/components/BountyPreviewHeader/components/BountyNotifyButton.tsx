import React from 'react'

// todo TODO: https://github.com/Joystream/pioneer/issues/1937
export const BountyNotifyButton = React.memo(() => {
  // const { t } = useTranslation('bounty')
  // till notifications doesn't work we won't display this button, used div instead of null to prevent typing issues
  return <div />

  // return (
  //   <ButtonGhost size="large">
  //     <BellIcon /> {t('common:buttons.notifyAboutChanges')}
  //   </ButtonGhost>
  // )
})
