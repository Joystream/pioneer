import React from 'react'

import { Loading } from '../../../common/components/Loading'
import {
  SidePaneColumn,
  SidePaneLabel,
  SidePaneRow,
  SidePaneTable,
  SidePaneText,
} from '../../../common/components/SidePane'
import { useApplicationQuestionAnswers } from '../../hooks/useApplicationQuestionAnswers'
import { ApplicationQuestionAnswer } from '../../types/ApplicationQuestionAnswer'

interface Props {
  applicationId: string
}

export const FormDetails = React.memo(({ applicationId }: Props) => {
  const { isLoading, answers } = useApplicationQuestionAnswers(applicationId)

  if (isLoading)
    return (
      <SidePaneTable>
        <Loading />
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

const QuestionAnswerPair = React.memo(({ answer }: { answer: ApplicationQuestionAnswer }) => (
  <SidePaneRow>
    <SidePaneColumn>
      <SidePaneLabel text={answer.question} />
      <SidePaneText>{answer.answer}</SidePaneText>
    </SidePaneColumn>
  </SidePaneRow>
))
