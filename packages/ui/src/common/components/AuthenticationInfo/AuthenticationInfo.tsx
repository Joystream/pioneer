import * as React from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons/Buttons'
import { CopyComponent } from '@/common/components/CopyComponent'
import { WarnedIconLine } from '@/common/components/icons/activities'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { SettingsInformation } from '@/common/components/SettingsInformation'
import { TextMedium } from '@/common/components/typography'

export interface AuthenticationInfoProps {
  InfoTitle: string
  InfoText: string
}

const AuthenticationInfo: React.FC<AuthenticationInfoProps> = React.memo(({ InfoTitle, InfoText }) => {
  return (
    <SettingsInformation title={InfoTitle} icon={<WarnedIconLine />} type="error">
      <AuthenNotiTextSection>
        <ColumnGapBlock gap={3}>
          <TextMedium light>{InfoText}</TextMedium>
        </ColumnGapBlock>
      </AuthenNotiTextSection>
      <ButtonGhost size="medium">Authorize again</ButtonGhost>
    </SettingsInformation>
  )
})

AuthenticationInfo.displayName = 'AuthenticationInfo'

export default AuthenticationInfo

const AuthenNotiTextSection = styled.div`
  margin-bottom: 12px;
`
export const CopyText = styled(CopyComponent)`
  font-size: 14px;
  margin-left: 5px;
`
