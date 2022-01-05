import { seedRandomBlockFields } from '@/mocks/data/seedRandomBlockFields'

import { seedOverridableEntities } from '../helpers/seedEntities'

import rawApplications from './raw/applications.json'

export interface RawApplication {
  id: string
  runtimeId: number
  openingId?: string
  applicantId: string
  answers?: MockAnswer[]
  status?: string
}

interface MockAnswer {
  questionId: string
  answer: string
}

const mockApplications = rawApplications.map((application) => ({ ...application }))

export const seedApplication = (rawApplication: RawApplication, server: any) => {
  const status = seedStatus(rawApplication.status, server)

  const member = server.schema.find('Membership', rawApplication.applicantId)
  const opening = server.schema.find('WorkingGroupOpening', rawApplication.openingId)

  const data = {
    ...rawApplication,
    status,
    roleAccount: member.rootAccount,
    rewardAccount: member.controllerAccount,
    stakingAccount: member.controllerAccount,
    createdInEvent: server.schema.create('AppliedOnOpeningEvent', {
      ...seedRandomBlockFields(),
      applicantId: member.id,
      openingId: rawApplication.openingId,
      groupId: opening.groupId,
    }),
  }
  const answers = rawApplication.answers ?? []
  delete data.answers
  const application = server.schema.create('WorkingGroupApplication', data)
  seedAnswers(application, answers, server)
}

export const seedApplications = seedOverridableEntities(mockApplications, seedApplication)

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
