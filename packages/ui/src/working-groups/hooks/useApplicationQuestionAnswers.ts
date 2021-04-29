import { useGetApplicationFormQuestionAnswerQuery } from '../queries'
import { asQuestionAnswer } from '../types/ApplicationQuestionAnswer'

export function useApplicationQuestionAnswers(applicationId: string) {
  const params = { variables: { applicationId_eq: applicationId } }
  const { loading, data } = useGetApplicationFormQuestionAnswerQuery(params)
  const answers = data?.applicationFormQuestionAnswers?.map(asQuestionAnswer)
  return { isLoading: loading, answers }
}
