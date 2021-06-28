import React, { useCallback } from 'react'
import styled from 'styled-components'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import { Link } from '@/common/components/Link'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'
import { RationaleModalCall } from '@/proposals/modals/AddNewProposal/components/RationaleModal'

interface ProposalDetailsStepProps {
  proposer: Member
  setTitle: (title: string) => void
  setRationale: (rationale: string) => void
}

export const ProposalDetailsStep = ({ proposer, setTitle, setRationale }: ProposalDetailsStepProps) => {
  const { showModal } = useModal()
  const showRationaleModal = useCallback(() => {
    showModal<RationaleModalCall>({
      modal: 'RationaleModal',
    })
  }, [])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>General parameters</h4>
          <TextMedium lighter>Proposal details</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Proposer" inputSize="l">
            <SelectMember onChange={() => true} disabled={true} selected={proposer} />
          </InputComponent>
          <InputComponent label="Proposal title" required inputSize="m" id="title-block">
            <InputText id="title-input" onChange={(event) => setTitle(event.target.value)} />
          </InputComponent>
          <InputComponent label="Rationale" required inputSize="auto" id="rationale-block">
            <CKEditor onChange={(event, editor) => setRationale(editor.getData())} />
          </InputComponent>
          <CustomLink onClick={showRationaleModal}>How to write a good rationale?</CustomLink>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const CustomLink = styled(Link)`
  color: ${Colors.Black[400]};
`
