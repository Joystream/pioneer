import React, { useState } from 'react'
import styled from 'styled-components'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import { Link } from '@/common/components/Link'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'
import { RationaleModal } from '@/proposals/modals/AddNewProposal/components/RationaleModal'

interface ProposalDetailsStepProps {
  proposer: Member
}

export const ProposalDetailsStep = ({ proposer }: ProposalDetailsStepProps) => {
  const [showRationale, setShowRationale] = useState<boolean>(false)

  return (
    <>
      <RowGapBlock gap={24}>
        <Row>
          <RowGapBlock gap={8}>
            <h4>General parameters</h4>
            <TextMedium lighter>Proposal details</TextMedium>
          </RowGapBlock>
        </Row>
        <Row>
          <RowGapBlock gap={20}>
            <SelectedMember label="Proposer" member={proposer} disabled />
            <InputComponent label="Proposal title" required inputSize="m" id="field-title" name="proposalDetails.title">
              <InputText id="field-title" name="proposalDetails.title" />
            </InputComponent>
            <InputComponent
              label="Rationale"
              required
              inputSize="auto"
              id="field-rationale"
              name="proposalDetails.rationale"
            >
              <CKEditor id="field-rationale" minRows={5} name="proposalDetails.rationale" />
            </InputComponent>
            <CustomLink onClick={() => setShowRationale(true)}>How to write a good rationale?</CustomLink>
          </RowGapBlock>
        </Row>
      </RowGapBlock>
      {showRationale && <RationaleModal closeModal={() => setShowRationale(false)} />}
    </>
  )
}

const CustomLink = styled(Link)`
  color: ${Colors.Black[400]};
`
