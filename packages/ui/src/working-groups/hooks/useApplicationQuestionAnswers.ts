import { useGetApplicationFormQuestionAnswerQuery } from '../queries'
import { asQuestionAnswer } from '../types/ApplicationFormQuestionAnswer'

export function useApplicationQuestionAnswers(applicationId: string) {
  const params = { variables: { application_eq: applicationId } }
  const { loading, data } = useGetApplicationFormQuestionAnswerQuery(params)
  const answers = data?.applicationFormQuestionAnswers?.map(asQuestionAnswer)
  return { isLoading: loading, answers }
}
