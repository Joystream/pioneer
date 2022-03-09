import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { ApplicationFormParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/types'

interface Props extends ApplicationFormParameters {
  setQuestions(questions: ApplicationFormParameters['questions']): void
}

export const ApplicationForm = ({ questions, setQuestions }: Props) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>{/* TODO add the questions */}</RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
