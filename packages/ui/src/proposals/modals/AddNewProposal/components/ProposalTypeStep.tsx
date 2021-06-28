import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { SuccessSymbol } from '@/common/components/icons/symbols'
import { List, ListItem } from '@/common/components/List'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { proposalDescriptions } from '@/proposals/model/proposalDescriptions'
import { enabledProposals } from '@/proposals/model/proposalDetails'
import { ProposalDetails } from '@/proposals/types'

interface ProposalTypeStepProps {
  type?: ProposalDetails
  setType: (type: ProposalDetails) => void
}

export const ProposalTypeStep = ({ type: chosenType, setType }: ProposalTypeStepProps) => {
  function selectType(type: ProposalDetails) {
    if (enabledProposals.includes(type)) {
      setType(type)
    }
  }

  return (
    <RowGapBlock gap={24}>
      <RowGapBlock gap={8}>
        <h4>Proposal type</h4>
        <TextMedium lighter>Please choose proposal type</TextMedium>
      </RowGapBlock>
      <Row>
        <List>
          {Object.entries(proposalDescriptions).map(([type, description]) => (
            <TypeListItem
              key={type}
              onClick={() => selectType(type as ProposalDetails)}
              active={type === chosenType}
              disabled={!enabledProposals.includes(type as ProposalDetails)}
            >
              <TypeItemWrap>
                <CSSTransition
                  in={type === chosenType}
                  classNames="ActiveTypeIcon"
                  timeout={Transitions.durationNumeric}
                  unmountOnExit
                >
                  <ActiveTypeIndicator>
                    <SuccessSymbol />
                  </ActiveTypeIndicator>
                </CSSTransition>
                <h5>{camelCaseToText(type)}</h5>
                <TextMedium light>{description}</TextMedium>
              </TypeItemWrap>
            </TypeListItem>
          ))}
        </List>
      </Row>
    </RowGapBlock>
  )
}

export const TypeListItem = styled(ListItem)<{ active: boolean; disabled: boolean }>`
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      border-color: ${Colors.Blue[500]};
      z-index: 2;
    `};
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      background-color: ${Colors.Black[50]};
      & > h5 {
        color: ${Colors.Black[500]};
      }
      ${TextMedium} {
        color: ${Colors.Black[400]};
      }
    `};
`

export const TypeItemWrap = styled(RowGapBlock)`
  position: relative;
  min-height: 100px;
  padding: 16px 24px 16px 40px;
`

const ActiveTypeIndicator = styled.div`
  position: absolute;
  top: 16px;
  left: 8px;
`
