import React from 'react'

import {
  SidePaneColumn,
  SidePaneLabel,
  SidePaneRow,
  SidePaneTable,
  SidePaneText,
} from '../../../common/components/SidePane'
import { useApplicationQuestionAnswers } from '../../hooks/useApplicationQuestionAnswers'
import { ApplicationFormQuestionAnswer } from '../../types/ApplicationFormQuestionAnswer'

interface Props {
  applicationId: string
}

export const FormDetails = React.memo(({ applicationId }: Props) => {
  const { isLoading, answers } = useApplicationQuestionAnswers(applicationId)

  if (isLoading)
    return (
      <SidePaneTable>
        <SidePaneText>Loading...</SidePaneText>
      </SidePaneTable>
    )

  return (
    <SidePaneTable>
      {answers?.map((answer) => (
        <QuestionAnswerPair answer={answer} key={answer.index} />
      ))}
    </SidePaneTable>
  )
})

const QuestionAnswerPair = React.memo(({ answer }: { answer: ApplicationFormQuestionAnswer }) => (
  <SidePaneRow>
    <SidePaneColumn>
      <SidePaneLabel text={answer.question} />
      <SidePaneText>{answer.answer}</SidePaneText>
    </SidePaneColumn>
  </SidePaneRow>
))
