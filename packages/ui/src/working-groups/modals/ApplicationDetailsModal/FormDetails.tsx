import React from 'react'

import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import {
  SidePaneColumn,
  SidePaneLabel,
  SidePaneWideRow,
  SidePaneTable,
  SidePaneText,
} from '@/common/components/SidePane'

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
        <QuestionAnswerPair answer={answer} key={answer.questionIndex} />
      ))}
    </SidePaneTable>
  )
})

const QuestionAnswerPair = React.memo(({ answer }: { answer: ApplicationQuestionAnswer }) => (
  <SidePaneWideRow>
    <SidePaneColumn>
      <SidePaneLabel text={answer.question} />
      {answer.questionType === 'TEXT' ? (
        <SidePaneText>{answer.answer}</SidePaneText>
      ) : (
        <MarkdownPreview markdown={answer.answer} />
      )}
    </SidePaneColumn>
  </SidePaneWideRow>
))
