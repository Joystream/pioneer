import { capitalizeFirstLetter } from '../../common/helpers'
import { ProposalDetails } from '../../proposals/types'

interface Destination {
  account: string
  amount: number
}

const seedFundingRequestDestination = (server: any) => (data: Destination) => {
  return server.schema.create('FundingRequestDestination', data)
}

const seedFundingRequestData = (data: { destinationsList: { destinations: Destination[] }}, server: any) => {
  const destinations = data.destinationsList.destinations
  const destinationsList = server.schema.create('FundingRequestDestinationsList', {
    destinations: destinations.map(seedFundingRequestDestination(server))
  })
  return { destinationsList }
}

const proposalDetailsSeeds: Partial<Record<ProposalDetails, (data: any, server: any) => any>> = {
  fundingRequest: seedFundingRequestData,
}

export const seedProposalDetails = (details: { type: string, data?: any }, server: any) => {
  return server.schema.create(capitalizeFirstLetter(details.type) + 'ProposalDetails', seedProposalDetailsData(details, server))
}

const seedProposalDetailsData = (details: { type: string, data?: any }, server: any) => {
  const type = details.type as ProposalDetails
  if (type in proposalDetailsSeeds) {
    return proposalDetailsSeeds[type]?.(details.data, server)
  }
  return {}
}
