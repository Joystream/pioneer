import rawApplications from './raw/applications.json'

export interface MockApplication {
  id: string
  openingId?: string
  applicantId: string
  roleAccount?: string
  rewardAccount?: string
  stakingAccount?: string
  answers?: any[]
  status?: string
  createdAtBlockId: string
  createdAtTime: string
}

const mockApplications = rawApplications.map((application) => ({ ...application }))

const seedApplication = (application: MockApplication, server: any) => {
  const status = seedStatus(application.status, server)
  const data = { ...application, status }
  server.schema.create('WorkingGroupApplication', data)
}

export const seedApplications = (server: any) =>
  mockApplications.forEach((application) => seedApplication(application, server))

function seedStatus(status: string | undefined, server: any) {
  switch (status) {
    case 'accepted':
      return server.schema.create('ApplicationStatusAccepted', {})
    case 'rejected':
      return server.schema.create('ApplicationStatusRejected', {})
    case 'withdrawn':
      return server.schema.create('ApplicationStatusWithdrawn', {})
    default:
      return server.schema.create('ApplicationStatusPending', {})
  }
}
