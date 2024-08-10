import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { ArrowDownExpandedIcon, Icon, Loader } from '@/common/components/icons'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { EMAIL_VERIFICATION_TOKEN_SEARCH_PARAM } from '@/memberships/constants'
import { useNotificationSettings } from '@/memberships/hooks/useNotificationSettings'

import { MemberDarkHover, MemberInfo, MembershipsCount } from '..'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { EmailConfirmationModalCall } from '../../modals/EmailConfirmationModal'
import { EmailSubscriptionModalCall } from '../../modals/EmailSubscriptionModal'
import { SwitchMemberModalCall } from '../../modals/SwitchMemberModal'

export const CurrentMember = () => {
  const { status, isLoading } = useOnBoarding()
  const { members, hasMembers, active } = useMyMemberships()
  const { showModal, modal } = useModal()
  const { activeMemberSettings, activeMemberExistBackendData } = useNotificationSettings()
  const showSubscriptionModal =
    active && activeMemberExistBackendData?.memberExist === false && !activeMemberSettings?.hasBeenAskedForEmail

  useEffect(() => {
    if (!emailVerificationToken && !modal && showSubscriptionModal) {
      showModal<EmailSubscriptionModalCall>({
        modal: 'EmailSubscriptionModal',
        data: {},
      })
    }
  }, [showSubscriptionModal, modal])

  const history = useHistory()
  const routeQuery = useRouteQuery()
  const emailVerificationToken = routeQuery.get(EMAIL_VERIFICATION_TOKEN_SEARCH_PARAM)
  useEffect(() => {
    if (emailVerificationToken) {
      const onModalClose = () => {
        routeQuery.delete(EMAIL_VERIFICATION_TOKEN_SEARCH_PARAM)
        history.replace({
          search: routeQuery.toString(),
        })
      }
      showModal<EmailConfirmationModalCall>({
        modal: 'EmailConfirmationModal',
        data: {
          token: emailVerificationToken,
          onClose: onModalClose,
        },
      })
    }
  }, [emailVerificationToken])

  if (status !== 'finished') {
    return (
      <MembershipButtonsWrapper>
        <MembershipActionButton
          onClick={() => showModal({ modal: 'OnBoardingModal' })}
          size="large"
          disabled={isLoading}
        >
          {isLoading && <Loader />}
          {status === 'installPlugin' ? 'Connect Wallet' : 'Join Now'}
        </MembershipActionButton>
      </MembershipButtonsWrapper>
    )
  }

  if (!hasMembers) {
    return <SwitchMembershipButton>Join Now</SwitchMembershipButton>
  }

  return (
    <>
      <MembershipsCount count={members.length} />
      {active && (
        <SwitchMember onClick={() => showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })}>
          {active && <MemberInfo member={active} isOnDark={true} maxRoles={4} skipModal />}
          <SwitchArrow>
            <ArrowDownExpandedIcon />
          </SwitchArrow>
        </SwitchMember>
      )}
      {!active && <SwitchMembershipButton>Select membership</SwitchMembershipButton>}
    </>
  )
}

const SwitchMembershipButton: FC = ({ children }) => {
  const { showModal } = useModal()
  return (
    <MembershipButtonsWrapper>
      <MembershipActionButton onClick={() => showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })} size="large">
        {children}
      </MembershipActionButton>
    </MembershipButtonsWrapper>
  )
}

const SwitchArrow = styled.span`
  width: 16px;
  height: 16px;

  ${Icon.type} {
    width: 100%;
    height: 100%;
    color: ${Colors.Black[400]};
    transform: rotate(-90deg);
    transition: ${Transitions.all};
  }
`

const SwitchMember = styled.div`
  display: grid;
  grid-template-columns: 1fr 16px;
  grid-column-gap: 8px;
  align-items: center;
  grid-area: memberaccount;
  padding: 12px 8px;
  background-color: ${Colors.Black[700]};
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    background-color: ${Colors.Black[600]};

    ${MemberDarkHover}
  }
`

export const MembershipActionButton = styled(ButtonPrimary)`
  width: 100%;
`

const MembershipButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  grid-area: memberaccount;
`
