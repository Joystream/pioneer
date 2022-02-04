import { ProposalMock } from '../../../dev/query-node-mocks/generators/generateProposals'

export const baseMock = {
  creatorId: '0',
  statusSetAtBlock: 0,
  createdInEvent: {
    inBlock: 0,
  },
  description: '',
  votes: [],
  proposalStatusUpdates: [],
  discussionThread: {
    discussionPosts: [],
    mode: 'ProposalDiscussionThreadModeClosed',
  },
  councilApprovals: 0,
}

export const testProposals: ProposalMock[] = [
  // Past
  {
    ...baseMock,
    id: '0',
    title: 'Canceled Proposal One',
    status: 'canceledByRuntime',
    createdAt: '2021-07-03T10:00:00.000Z',
    statusSetAtTime: '2021-07-09T10:00:00.000Z',
    details: {
      type: 'fundingRequest',
      data: {
        destinationsList: {
          destinations: [
            {
              account: '5GETSBUMwbLJgUTWMQgU8B2CP7E8kDHR8NoNNZh5tqums9AF',
              amount: 5000,
            },
          ],
        },
      },
    },
  },
  {
    ...baseMock,
    id: '1',
    title: 'Very Similar Name Proposal',
    status: 'executed',
    createdAt: '2021-07-05T10:00:00.000Z',
    statusSetAtTime: '2021-07-06T10:00:00.000Z',
    details: {
      type: 'fundingRequest',
      data: {
        destinationsList: {
          destinations: [
            {
              account: '5GETSBUMwbLJgUTWMQgU8B2CP7E8kDHR8NoNNZh5tqums9AF',
              amount: 5000,
            },
          ],
        },
      },
    },
    creatorId: '1',
  },
  {
    ...baseMock,
    id: '2',
    title: 'Executed Proposal Two',
    status: 'executed',
    createdAt: '2021-07-01T10:00:00.000Z',
    statusSetAtTime: '2021-07-04T10:00:00.000Z',
    details: {
      type: 'runtimeUpgrade',
      data: {
        bytecode: '0x0061736d',
      },
    },
  },
  {
    ...baseMock,
    id: '3',
    title: 'Quite Similar Named Proposal',
    status: 'vetoed',
    createdAt: '2021-07-08T10:00:00.000Z',
    statusSetAtTime: '2021-07-14T10:00:00.000Z',
    details: {
      type: 'runtimeUpgrade',
      data: {
        bytecode: '0x0061736d',
      },
    },
    creatorId: '1',
  },
  {
    ...baseMock,
    id: '4',
    title: 'Rejected Proposal',
    status: 'rejected',
    createdAt: '2021-07-08T10:00:00.000Z',
    statusSetAtTime: '2021-07-14T10:00:00.000Z',
    details: {
      type: 'runtimeUpgrade',
      data: {
        bytecode: '0x0061736d',
      },
    },
    creatorId: '1',
  },
  {
    ...baseMock,
    id: '5',
    title: 'Slashed Proposal',
    status: 'slashed',
    createdAt: '2021-07-08T10:00:00.000Z',
    statusSetAtTime: '2021-07-14T10:00:00.000Z',
    details: {
      type: 'runtimeUpgrade',
      data: {
        bytecode: '0x0061736d',
      },
    },
    creatorId: '1',
  },
  // Active
  {
    ...baseMock,
    id: '6',
    title: 'Gracing Proposal One',
    status: 'gracing',
    createdAt: '2021-07-21T10:00:00.000Z',
    statusSetAtTime: '2021-07-24T10:00:00.000Z',
    details: {
      type: 'fundingRequest',
      data: {
        destinationsList: {
          destinations: [
            {
              account: '5GETSBUMwbLJgUTWMQgU8B2CP7E8kDHR8NoNNZh5tqums9AF',
              amount: 5000,
            },
          ],
        },
      },
    },
  },
]
