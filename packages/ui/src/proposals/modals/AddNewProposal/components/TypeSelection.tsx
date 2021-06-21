import React from 'react'
import styled from 'styled-components'

import { AccountItemWrap } from '@/app/pages/Profile/components/AccountItem'
import { List, ListItem } from '@/common/components/List'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Sizes } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { MemberItemWrap } from '@/memberships/components/MemberListItem/Fileds'
import { proposalDescriptions } from '@/proposals/model/proposalDescriptions'

export const TypeSelection = () => {
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
            <ListItem key={type}>
              <TypeItemWrap>
                <TextBig dark bold>
                  {camelCaseToText(type)}
                </TextBig>
                <TextMedium light>{description}</TextMedium>
              </TypeItemWrap>
            </ListItem>
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
