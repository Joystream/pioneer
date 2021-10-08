import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { Loading } from '@/common/components/Loading'
import { ModalFooter } from '@/common/components/Modal'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { TabProps, Tabs } from '@/common/components/Tabs'
import { useEscape } from '@/common/hooks/useEscape'
import { useModal } from '@/common/hooks/useModal'
import { Member } from '@/memberships/types'
import { EmptyBody } from '@/proposals/modals/VoteRationale/VoteRationale'

import { MemberInfoWrap } from '..'
import { MemberInfo } from '../MemberInfo'

interface Props {
  member?: Member
  isLoading?: boolean
  tabs: TabProps[]
  contextButtons?: ReactNode
  title: string
  children: ReactNode
  closeModal?: () => void
  footer?: ReactNode
}

export const MemberModal = React.memo(
  ({ member, isLoading, tabs, children, contextButtons, title, closeModal, footer }: Props) => {
    const { hideModal: localCloseModal } = useModal()

    const hideModal = closeModal ?? localCloseModal

    const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        hideModal()
      }
    }

    useEscape(() => hideModal())

    if (isLoading || !member) {
      return (
        <SidePaneGlass onClick={onBackgroundClick}>
          <SidePane>
            <SidePaneBody>
              <EmptyBody>
                <Loading />
              </EmptyBody>
            </SidePaneBody>
          </SidePane>
        </SidePaneGlass>
      )
    }

    return (
      <SidePaneGlass onClick={onBackgroundClick}>
        <SidePane>
          <MemberPanelHeader>
            <SidePanelTop>
              <SidePaneTitle>{title}</SidePaneTitle>
              {contextButtons}
              <CloseButton onClick={hideModal} />
            </SidePanelTop>
            <MemberInfo member={member} memberSize="l" size="l" skipModal />
            <Tabs tabs={tabs} tabsSize="xs" />
          </MemberPanelHeader>
          <SidePaneBody>{children}</SidePaneBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </SidePane>
      </SidePaneGlass>
    )
  }
)

const MemberPanelHeader = styled(SidePaneHeader)`
  ${MemberInfoWrap} {
    padding-bottom: 4px;
  }
`
