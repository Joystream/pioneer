import rawApplications from './raw/applications.json'

export interface MockApplication {
  id: string
  openingId?: string
  applicantId: string
  roleAccount?: string
  rewardAccount?: string
  stakingAccount?: string
  answers?: MockAnswer[]
  status?: string
  createdAtBlockId: number
  createdAt: string
}

interface MockAnswer {
  questionId: string
  answer: string
}

const mockApplications = rawApplications.map((application) => ({ ...application }))

const seedApplication = (rawApplication: MockApplication, server: any) => {
  const status = seedStatus(rawApplication.status, server)
  const data = { ...rawApplication, status }
  const answers = rawApplication.answers ?? []
  delete data.answers
  const application = server.schema.create('WorkingGroupApplication', data)
  seedAnswers(application, answers, server)
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

function seedAnswer(application: any, answer: MockAnswer, server: any) {
  server.schema.create('ApplicationFormQuestionAnswer', { ...answer, application })
}

function seedAnswers(application: any, answers: MockAnswer[], server: any) {
  answers.forEach((answer) => seedAnswer(application, answer, server))
}
