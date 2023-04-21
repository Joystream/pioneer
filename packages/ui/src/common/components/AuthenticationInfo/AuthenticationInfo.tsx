import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CopyComponent } from '@/common/components/CopyComponent'
import { WarnedIconLine } from '@/common/components/icons/activities'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { AuthenticationInformation } from '@/common/components/AuthenticationInfo/AuthenticationInformation'
import { TextMedium } from '@/common/components/typography'
import { ButtonGhost } from '@/common/components/buttons/Buttons'

export interface AuthenticationInfoProps {
  InfoTitle: string
  InfoText: string
}

const AuthenticationInfo: React.FC<AuthenticationInfoProps> = React.memo(
  ({ InfoTitle, InfoText }) => {
    const { t } = useTranslation('settings')
    return (
      <AuthenticationInformation title={InfoTitle} icon={<WarnedIconLine />}>
        <ColumnGapBlock gap={3}>
          <TextMedium light>{InfoText}</TextMedium>
        </ColumnGapBlock>
        <ButtonGhost size="medium">Authorize again</ButtonGhost>
      </AuthenticationInformation>
    )
  }
)

AuthenticationInfo.displayName = 'AuthenticationInfo'

export default AuthenticationInfo

export const CopyText = styled(CopyComponent)`
  font-size: 14px;
  margin-left: 5px;
`
