import React from 'react'
import styled from 'styled-components'

import { ConnectionStatusDot } from '@/app/components/ConnectionStatusDot'
import { GithubLogo } from '@/common/components/icons/GithubLogo'
import { SmallJoystreamLogo } from '@/common/components/icons/SmallJoystreamLogo'
import { Colors } from '@/common/constants'
import { BalanceTitle } from '@/memberships/components/ProfileComponent'

const REPOSITORY_URL = 'https://github.com/Joystream/pioneer'

export const SidebarConnections = () => {
  return (
    <Wrapper>
      <BalanceTitle>Powered By</BalanceTitle>
      <div>
        <LinksContainer>
          <SmallJoystreamLogo />
          <div className="separator" />
          <GithubLogo className="github-logo" onClick={() => window.open(REPOSITORY_URL, '_blank')} />
        </LinksContainer>
        <ConnectionStatusDot />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 10px 16px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 5px;

  > svg {
    cursor: pointer;
    color: ${Colors.Black[400]};
    :hover {
      color: ${Colors.LogoPurple};
    }
  }

  .separator {
    height: 3px;
    width: 3px;
    background-color: ${Colors.Black[400]};
    border-radius: 50%;
  }
`
