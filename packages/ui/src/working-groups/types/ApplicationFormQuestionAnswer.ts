import { ApplicationFormQuestionAnswerFieldsFragment } from '../queries'

export interface ApplicationFormQuestionAnswer {
  question: string
  answer: string
}

export function asQuestionAnswer(fragment: ApplicationFormQuestionAnswerFieldsFragment): ApplicationFormQuestionAnswer {
  return {
    question: fragment.question.question,
    answer: fragment.answer,
  }
}
