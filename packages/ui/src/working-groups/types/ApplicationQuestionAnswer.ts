import { ApplicationFormQuestionAnswerFieldsFragment } from '../queries'

export interface ApplicationQuestionAnswer {
  question: string
  answer: string
  index: number
}

export function asQuestionAnswer(fragment: ApplicationFormQuestionAnswerFieldsFragment): ApplicationQuestionAnswer {
  return {
    question: fragment.question.question,
    answer: fragment.answer,
    index: fragment.question.index,
  }
}
