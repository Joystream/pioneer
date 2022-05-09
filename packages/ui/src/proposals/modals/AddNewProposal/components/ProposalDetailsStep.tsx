import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import { hasError } from '@/common/components/forms/FieldError'
import { Link } from '@/common/components/Link'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useForm } from '@/common/hooks/useForm'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'
import { RationaleModal } from '@/proposals/modals/AddNewProposal/components/RationaleModal'

interface ProposalDetailsStepProps {
  proposer: Member
  title: string
  rationale: string
  setTitle: (title: string) => void
  setRationale: (rationale: string) => void
  setValidNext: (isValid: boolean) => void
}

interface Fields {
  title: string
  rationale: string
}

export const ProposalDetailsStep = ({
  proposer,
  title,
  rationale,
  setTitle,
  setRationale,
  setValidNext,
}: ProposalDetailsStepProps) => {
  const [showRationale, setShowRationale] = useState<boolean>(false)

  const { api } = useApi()
  const detailsSchema = useMemo(() => {
    if (api) {
      const titleMaxLength = api.consts.proposalsEngine.titleMaxLength.toNumber()
      const descMaxLength = api.consts.proposalsEngine.descriptionMaxLength.toNumber()
      return Yup.object().shape({
        title: Yup.string().required().max(titleMaxLength),
        rationale: Yup.string().required().max(descMaxLength),
      })
    }
    return Yup.object().shape({ title: Yup.string().required(), description: Yup.string() })
  }, [api?.isConnected])
  const { fields, changeField, validation } = useForm<Fields>({ title, rationale }, detailsSchema)
  const { isValid, errors } = validation

  useEffect(() => setTitle(fields.title), [fields.title])
  useEffect(() => setRationale(fields.rationale), [fields.rationale])
  useEffect(() => setValidNext(isValid), [isValid])

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
            <InputComponent
              label="Proposal title"
              required
              inputSize="m"
              id="field-title"
              validation={hasError('title', errors) ? 'invalid' : undefined}
              message={
                hasError('title', errors) && fields.title.length > 0 ? 'Title exceeds maximum length.' : undefined
              }
            >
              <InputText
                id="field-title"
                value={fields.title ?? ''}
                onChange={(event) => changeField('title', event.target.value)}
              />
            </InputComponent>
            <InputComponent
              label="Rationale"
              required
              inputSize="auto"
              id="field-rationale"
              validation={hasError('rationale', errors) ? 'invalid' : undefined}
              message={
                hasError('rationale', errors) && fields.rationale.length > 0
                  ? 'Rationale exceeds maximum length.'
                  : undefined
              }
            >
              <CKEditor
                id="field-rationale"
                minRows={5}
                onChange={(event, editor) => changeField('rationale', editor.getData())}
                onReady={(editor) => editor.setData(rationale)}
              />
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
