import { useGetWorkingGroupOpeningQuestionsQuery } from '../queries'
import { asApplicationQuestion } from '../types'

interface UseOpeningQuestionsParams {
  id?: string
}

export const useOpeningQuestions = ({ id }: UseOpeningQuestionsParams) => {
  const { loading, data } = useGetWorkingGroupOpeningQuestionsQuery({ variables: { id: id ?? '' } })

  const opening = data?.workingGroupOpeningByUniqueInput

  return {
    isLoading: loading,
    questions: (opening?.metadata?.applicationFormQuestions ?? []).map(asApplicationQuestion),
  }
}
