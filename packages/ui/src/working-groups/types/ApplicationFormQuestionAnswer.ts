import { ApplicationFormQuestionAnswerFieldsFragment } from '../queries'

export interface ApplicationFormQuestionAnswer {
  question: string
  answer: string
  index: number
}

export function asQuestionAnswer(fragment: ApplicationFormQuestionAnswerFieldsFragment): ApplicationFormQuestionAnswer {
  return {
    question: fragment.question.question,
    answer: fragment.answer,
    index: fragment.question.index,
  }
}
