import React, { useMemo } from 'react'
import styled from 'styled-components'

import { TransferModalCall } from '@/accounts/modals/TransferModal'
import { ProfileRoutes } from '@/app/constants/routes'
import { ModalNames } from '@/app/GlobalModals'
import { Tooltip, TooltipExternalLink, TooltipLink } from '@/common/components/Tooltip'
import { TextInlineMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

import { OptionLock } from '../../types'

interface Props {
  locks?: OptionLock[]
  children: React.ReactNode
  boundaryClassName?: string
}

export const AccountLockTooltip = ({ locks, children, boundaryClassName }: Props) => {
  const { modal: originalModalName, modalData: originalModalData, showModal } = useModal()
  const tooltipTexts = useMemo(() => {
    const texts: React.ReactElement[] = []

    if (locks?.includes('optOutLock')) {
      texts.push(
        <li className="tooltipLink" key="optOutLock">
          This account has permanently opted out from voting.
          <br />
        </li>
      )
    }

    if (locks?.includes('boundMembership')) {
      texts.push(
        <li className="tooltipLink" key="boundMembership">
          This account is bounded to another membership.{' '}
          <LinkText
            onClick={() =>
              showModal<SwitchMemberModalCall>({
                modal: 'SwitchMember',
                data: {
                  originalModalName: originalModalName as ModalNames,
                  originalModalData,
                },
              })
            }
          >
            Change membership
          </LinkText>{' '}
          to use this account.
          <br />
        </li>
      )
    }

    if (locks?.includes('rivalrousLock')) {
      texts.push(
        <li className="tooltipLink" key="rivalrousLock">
          You cannot select this account because it has a lock preventing its usage for staking. Role stake can be
          recovered after the role is terminated, while proposal locks get recovered automatically, when proposals get
          executed.{' '}
          <InlineExternalLink
            href="https://joystream.gitbook.io/testnet-workspace/system/accounts-and-staking#locks-1"
            target="_blank"
          >
            <LinkText>Learn more about Locks.</LinkText>
          </InlineExternalLink>
          <br />
        </li>
      )
    }

    if (locks?.includes('recoverableLock')) {
      texts.push(
        <li className="tooltipLink" key="recoverableLock">
          You cannot select this account because it contains lock.{' '}
          <TooltipLink to={ProfileRoutes.profile} target="_self">
            Recover this lock
          </TooltipLink>{' '}
          to use this account.
          <br />
        </li>
      )
    }

    if (locks?.includes('insufficientFunds')) {
      texts.push(
        <li className="tooltipLink" key="insufficientFunds">
          This account does not have enough tokens. You can{' '}
          <LinkText onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: {} })}>
            move funds
          </LinkText>{' '}
          from other accounts to meet the requirements.
          <br />
        </li>
      )
    }

    return <LocksList>{texts}</LocksList>
  }, [JSON.stringify(locks)])

  return (
    <Tooltip boundaryClassName={boundaryClassName} tooltipText={tooltipTexts} maxWidth>
      {children}
    </Tooltip>
  )
}

const LinkText = styled(TextInlineMedium)`
  color: ${Colors.Blue[500]};
  text-decoration: underline;
  cursor: pointer;
`

const InlineExternalLink = styled(TooltipExternalLink)`
  display: inline;
`

const LocksList = styled.ul`
  & li {
    padding: 10px 0;
    border-bottom: 1px solid ${Colors.Black[600]};
    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
`
