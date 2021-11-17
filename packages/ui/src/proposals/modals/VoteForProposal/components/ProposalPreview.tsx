import React from 'react'
import styled from 'styled-components'

import { TextInlineMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { shortenAddress } from '@/common/model/formatters'

interface Props {
  proposalTitle: string
  rationale: string
  recipient: string
  proposalType: string
}

export const ProposalPreview = ({ proposalTitle, rationale, recipient, proposalType }: Props) => {
  return (
    <>
      <h4>{proposalTitle}</h4>
      <h5>{camelCaseToText(proposalType)}</h5>
      <ProposalDetailsTitle>Recipent of funds</ProposalDetailsTitle>
      <RecipientAccount>{shortenAddress(recipient)}</RecipientAccount>
      <ProposalDetailsTitle>Rationale</ProposalDetailsTitle>
      <ProposalDetailsInfo>{rationale}</ProposalDetailsInfo>
    </>
  )
}

const ProposalDetailsTitle = styled(TextSmall)`
  text-transform: uppercase;
  color: ${Colors.Gray[700]};
`

const ProposalDetailsInfo = styled(TextInlineMedium)`
  color: ${Colors.Gray[700]};
`

const RecipientAccount = styled(TextInlineMedium)`
  color: ${Colors.Gray[900]};
  font-weight: 600;
`
