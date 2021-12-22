import { capitalizeFirstLetter } from '@/common/helpers'
import { ProposalType } from '@/proposals/types'

import { RawOpeningMetadata, seedOpeningQuestions } from './seedOpenings'

interface Destination {
  account: string
  amount: number
}

const seedFundingRequestDestination = (server: any) => (data: Destination) => {
  return server.schema.create('FundingRequestDestination', data)
}

const seedFundingRequestData = (data: { destinationsList: { destinations: Destination[] } }, server: any) => {
  const destinations = data.destinationsList.destinations
  const destinationsList = server.schema.create('FundingRequestDestinationsList', {
    destinations: destinations.map(seedFundingRequestDestination(server)),
  })
  return { destinationsList }
}

interface RawCreateLeadOpeningData {
  metadata: RawOpeningMetadata
  stakeAmount: number
  unstakingPeriod: number
  rewardPerBlock: number
  groupId: string
}

const seedCreateLeadOpeningData = (data: RawCreateLeadOpeningData, server: any) => {
  const rawMetadata = { ...data.metadata }
  const questions = rawMetadata.applicationFormQuestions
  rawMetadata.applicationFormQuestions = []
  const metadata = server.schema.create('WorkingGroupOpeningMetadata', rawMetadata)

  seedOpeningQuestions(questions, metadata, server)
  return {
    ...data,
    metadata,
  }
}

interface RawLeadStakeData {
  leadId: 'string'
  amount: number
}

const seedLeadStakeProposalData = (data: RawLeadStakeData) => data

const seedTerminateGroupLead = (data: RawLeadStakeData) => ({
  leadId: data.leadId,
  slashingAmount: data.amount,
})

interface RawRuntimeUpgradeData {
  bytecode: string
}

const seedRuntimeUpgradeData = (data: RawRuntimeUpgradeData, server: any) => {
  return {
    newRuntimeBytecode: server.schema.create('RuntimeWasmBytecode', { bytecode: data.bytecode }),
  }
}

const seedObjectCopy = (data: any) => data

const proposalDetailsSeeds: Partial<Record<ProposalType, (data: any, server: any) => any>> = {
  fundingRequest: seedFundingRequestData,
  createWorkingGroupLeadOpening: seedCreateLeadOpeningData,
  decreaseWorkingGroupLeadStake: seedLeadStakeProposalData,
  slashWorkingGroupLead: seedLeadStakeProposalData,
  runtimeUpgrade: seedRuntimeUpgradeData,
  updateWorkingGroupBudget: seedObjectCopy,
  setMaxValidatorCount: seedObjectCopy,
  fillWorkingGroupLeadOpening: seedObjectCopy,
  setWorkingGroupLeadReward: seedObjectCopy,
  terminateWorkingGroupLead: seedTerminateGroupLead,
  setMembershipPrice: seedObjectCopy,
  setCouncilBudgetIncrement: seedObjectCopy,
  signal: seedObjectCopy,
  cancelWorkingGroupLeadOpening: seedObjectCopy,
  setReferralCut: seedObjectCopy,
  setInitialInvitationBalance: seedObjectCopy,
  setInitialInvitationCount: seedObjectCopy,
  setCouncilorReward: seedObjectCopy,
  veto: seedObjectCopy,
}

export const seedProposalDetails = (details: { type: string; data?: any }, server: any) => {
  const type = details.type as ProposalType
  const data = type in proposalDetailsSeeds ? proposalDetailsSeeds[type]?.(details.data, server) : {}
  return server.schema.create(capitalizeFirstLetter(details.type) + 'ProposalDetails', data)
}
