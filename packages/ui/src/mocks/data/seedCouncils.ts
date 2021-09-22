import rawCouncilors from './raw/councilors.json'
import rawCouncils from './raw/councils.json'

export interface RawCouncilorMock {
  id: string
  memberId: string
  unpaidReward: number
  stake: number
}
export interface RawCouncilMock {
  id: string
  councilMemberIds: string[]
  deletedAt: null
}

export const seedCouncilMember = (data: RawCouncilorMock, server: any) => server.schema.create('CouncilMember', data)

export const seedCouncilMembers = (server: any) => {
  rawCouncilors.map((data) => seedCouncilMember(data, server))
}

export const seedElectedCouncil = (data: RawCouncilMock, server: any) => server.schema.create('ElectedCouncil', data)

export const seedElectedCouncils = (server: any) => {
  rawCouncils.map((data) => seedElectedCouncil(data, server))
}
