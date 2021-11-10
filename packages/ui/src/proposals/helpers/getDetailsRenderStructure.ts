import { omit } from 'lodash'

import {ProposalDetailsKeys, ProposalWithDetails} from '@/proposals/types'

export type RenderType = 'Text' | 'BigText' | 'Amount' | 'Markdown'

export interface RenderNode {
  label: string
  value: any
  renderType: RenderType
}

type ProposalDetailValue = keyof ProposalWithDetails['details']

const destinationsMapper = (value: any, type: string): RenderNode[] => {
  const account = value[0].account
  return [
    {
      label: 'destination',
      value: account,
      renderType: 'Text',
    }
  ]
}

const mappers: { [key: string]: any } = {
  destinations: destinationsMapper
}

const mapProposalDetail = (key: ProposalDetailValue, proposalDetails: ProposalWithDetails['details']) => {
  const type = proposalDetails['type']
  const value = proposalDetails[key]
  return mappers[key] && mappers[key](value, type);
}

const getDetailsRenderStructure = (proposalDetails: ProposalWithDetails['details']) => {
  // console.log({ proposalDetails })

  if (!proposalDetails) return {}

  const structure = Object.keys(proposalDetails).map((key: ProposalDetailsKeys) => mapProposalDetail(key, proposalDetails))
  console.log({ structure })
  return {
    test: 'test'
  }
}

export default getDetailsRenderStructure
