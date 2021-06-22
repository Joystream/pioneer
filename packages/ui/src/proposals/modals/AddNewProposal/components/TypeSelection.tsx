import React from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { proposalDescriptions } from '@/proposals/model/proposalDescriptions'
import { ProposalDetails } from '@/proposals/types'

interface TypeSelectionProps {
  type: ProposalDetails | null
  setType: (type: ProposalDetails) => void
}

export const TypeSelection = ({ type: chosenType, setType }: TypeSelectionProps) => {
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
            <TypeListItem key={type} onClick={() => setType(type as ProposalDetails)} active={type === chosenType}>
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

export const TypeItemWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  min-height: 100px;
  padding: 8px 16px;
  cursor: pointer;
`

export const TypeListItem = styled(ListItem)<{ active: boolean }>`
  ${({ active }) => active && `border-color: ${Colors.Blue[500]};`}
`
