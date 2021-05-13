import rawApplications from './raw/applications.json'

export interface RawApplication {
  openingId?: string
  applicantId: string
  answers?: MockAnswer[]
  status?: string
  createdAtBlockId: number
}

interface MockAnswer {
  questionId: string
  answer: string
}

const mockApplications = rawApplications.map((application) => ({ ...application }))

const seedApplication = (rawApplication: RawApplication, server: any) => {
  const status = seedStatus(rawApplication.status, server)

  const member = server.schema.find('Membership', rawApplication.applicantId)

  const data = {
    ...rawApplication,
    status,
    roleAccount: member.rootAccount,
    rewardAccount: member.controllerAccount,
    stakingAccount: member.controllerAccount,
  }
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
