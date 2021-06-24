import React from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
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
      <Row>
        <RowGapBlock gap={8}>
          <h4>Proposal type</h4>
          <TextMedium lighter>Please choose proposal type</TextMedium>
        </RowGapBlock>
      </Row>
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
                <TextBig dark bold>
                  {camelCaseToText(type)}
                </TextBig>
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
  ${({ active }) => active && `border-color: ${Colors.Blue[500]};`}
  ${({ disabled }) => disabled && 'cursor: not-allowed; opacity: .5;'}
`

export const TypeItemWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  min-height: 100px;
  padding: 8px 16px;
`
