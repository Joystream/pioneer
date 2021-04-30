import { ApplicationFormQuestionAnswerFieldsFragment } from '../queries'

export interface ApplicationQuestionAnswer {
  question: string
  answer: string
  questionIndex: number
  questionType: QuestionType
}

type QuestionType = 'TEXT' | 'TEXTAREA'

export function asQuestionAnswer(fragment: ApplicationFormQuestionAnswerFieldsFragment): ApplicationQuestionAnswer {
  return {
    question: fragment.question?.question ?? '',
    answer: fragment.answer,
    questionIndex: fragment.question.index,
    questionType: fragment.question.type,
  }
}
