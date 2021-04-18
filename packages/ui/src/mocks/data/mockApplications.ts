import rawApplications from './raw/applications.json'

export interface MockApplication {
  id: string
  openingId?: string
  applicantId: string
  roleAccount?: string
  rewardAccount?: string
  stakingAccount?: string
  answers?: any[]
  statusId?: string
  createdAtBlockId: string
  createdAtTime: string
}

const mockApplications = rawApplications.map((application) => ({ ...application }))

const seedApplication = (application: MockApplication, server: any) => {
  const data = {
    ...application,
    statusId: null,
  }
  const groupApplication = server.schema.create('WorkingGroupApplication', data)
}

export const seedApplications = (server: any) =>
  mockApplications.forEach((application) => seedApplication(application, server))
