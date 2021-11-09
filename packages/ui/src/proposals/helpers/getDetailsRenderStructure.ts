import {Proposal} from '@/proposals/types'

const getDetailsRenderStructure = (proposalDetails: Proposal['details']) => {
  console.log({ proposalDetails })
  return {
    test: 'test'
  }
}

export default getDetailsRenderStructure
