import React from 'react'
import styled from 'styled-components'

import { ConnectionStatusDot } from '@/app/components/ConnectionStatusDot'
import { GithubLogo } from '@/common/components/icons/GithubLogo'
import { SmallJoystreamLogo } from '@/common/components/icons/SmallJoystreamLogo'
import { Colors } from '@/common/constants'
import { BalanceTitle } from '@/memberships/components/ProfileComponent'

const REPOSITORY_URL = 'https://github.com/Joystream/pioneer'
const JOYSTREAM_URL = 'https://www.joystream.org/'

export const SidebarConnections = () => {
  return (
    <Wrapper>
      <BalanceTitle>Powered By</BalanceTitle>
      <div>
        <LinksContainer>
          <a href={JOYSTREAM_URL} target="_blank">
            <SmallJoystreamLogo />
          </a>
          <div className="separator" />
          <a href={REPOSITORY_URL} target="_blank">
            <GithubLogo />
          </a>
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
  margin: 6px 0 12px 0;

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

  > svg,
  a {
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
