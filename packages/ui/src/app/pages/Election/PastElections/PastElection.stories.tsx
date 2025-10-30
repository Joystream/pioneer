import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { GetPastElectionDocument } from '@/council/queries'
import { MocksParameters } from '@/mocks/providers'

import { PastElection } from './PastElection'

type Story = StoryObj<FC>

type Args = {
  result: 'successful' | 'failed'
}

const ElectionRoundId = '00000019'

export default {
  title: 'Pages/Election/PastElections/PastElection',
  argTypes: {
    result: {
      control: { type: 'radio' },
      options: ['successful', 'failed'],
    },
  },
  args: {
    result: 'successful',
  },
  component: PastElection,
  parameters: {
    router: { path: '/:id', href: `/${ElectionRoundId}` },

    mocks: ({ args }: StoryContext<Args>): MocksParameters => {
      const nextElectedCouncil =
        args.result == 'successful'
          ? {
              councilElections: [
                {
                  cycleId: 44,
                },
              ],
            }
          : null
      return {
        gql: {
          queries: [
            {
              query: GetPastElectionDocument,
              data: {
                electionRoundByUniqueInput: {
                  id: '00000018',
                  cycleId: 44,
                  endedAtBlock: 11851230,
                  endedAtTime: '2025-03-14T04:00:48.000Z',
                  endedAtNetwork: 'OLYMPIA',
                  candidates: [
                    {
                      id: '0000006z',
                      member: {
                        id: '2154',
                        rootAccount: 'j4WimuwF1N3nqff211ifeGSW8q5DW8xWpsjaNf9Feds1MDo5B',
                        controllerAccount: 'j4WimuwF1N3nqff211ifeGSW8q5DW8xWpsjaNf9Feds1MDo5B',
                        boundAccounts: [
                          'j4VSHQU7vhHUM8XB3bCBfFGpgb46hJFCgv9DnQSYFhygGLXjx',
                          'j4WimuwF1N3nqff211ifeGSW8q5DW8xWpsjaNf9Feds1MDo5B',
                          'j4RgyJZGRFbtXiY5AZFoTnoYjpTFHx4ar2N5PsPqKg9ryaHfn',
                          'j4TeRe6xT2s6QPgMWmADNnqXSjz4tsNC1XEgc8KWnygoLFtZo',
                          'j4VxCgPkSDZrynLGJj5XszwuzVTrNXG1WsLg9cZPqYbgyfpML',
                          'j4Ssvsr49QwDvm875HGVestJUPg58LJDS8TaiuRMdSwmPNoWa',
                        ],
                        handle: 'marat_mu',
                        metadata: {
                          name: null,
                          about:
                            'Deep in crypto. \nMy contacts:\nDiscord - MarikJudo\nTelegram - @МarikJudo\nKeybase - marikjudo',
                          avatar: {
                            __typename: 'AvatarUri',
                            avatarUri: 'https://atlas-services.joystream.org/avatars/migrated/2154.webp',
                          },
                          isVerifiedValidator: false,
                        },
                        isVerified: true,
                        isFoundingMember: true,
                        isCouncilMember: false,
                        inviteCount: 2,
                        roles: [
                          {
                            id: 'operationsWorkingGroupGamma-28',
                            group: {
                              name: 'operationsWorkingGroupGamma',
                            },
                            createdAt: '2024-02-16T06:50:30.000Z',
                            isLead: false,
                            isActive: true,
                          },
                        ],
                        createdAt: '2024-12-20T02:23:00.000Z',
                        stakingaccountaddedeventmember: [
                          {
                            createdAt: '2023-11-23T14:25:00.001Z',
                            inBlock: 5011185,
                            network: 'OLYMPIA',
                            account: 'j4VSHQU7vhHUM8XB3bCBfFGpgb46hJFCgv9DnQSYFhygGLXjx',
                          },
                          {
                            createdAt: '2024-01-07T17:55:18.001Z',
                            inBlock: 5658642,
                            network: 'OLYMPIA',
                            account: 'j4WimuwF1N3nqff211ifeGSW8q5DW8xWpsjaNf9Feds1MDo5B',
                          },
                          {
                            createdAt: '2024-01-15T14:37:24.000Z',
                            inBlock: 5771640,
                            network: 'OLYMPIA',
                            account: 'j4RgyJZGRFbtXiY5AZFoTnoYjpTFHx4ar2N5PsPqKg9ryaHfn',
                          },
                          {
                            createdAt: '2024-02-11T17:43:42.001Z',
                            inBlock: 6161782,
                            network: 'OLYMPIA',
                            account: 'j4TeRe6xT2s6QPgMWmADNnqXSjz4tsNC1XEgc8KWnygoLFtZo',
                          },
                          {
                            createdAt: '2024-02-15T17:44:18.000Z',
                            inBlock: 6219315,
                            network: 'OLYMPIA',
                            account: 'j4VxCgPkSDZrynLGJj5XszwuzVTrNXG1WsLg9cZPqYbgyfpML',
                          },
                          {
                            createdAt: '2024-05-23T09:48:42.001Z',
                            inBlock: 7617210,
                            network: 'OLYMPIA',
                            account: 'j4Ssvsr49QwDvm875HGVestJUPg58LJDS8TaiuRMdSwmPNoWa',
                          },
                        ],
                      },
                      stake: '1666666666660000',
                      noteMetadata: {
                        header: 'MarikJudo for Council',
                        bulletPoints: ['Marketing', 'Roadmap'],
                        bannerImageUri: 'https://i.postimg.cc/Pr3mDmgp/21.png',
                        description:
                          'Hey, everybody!  \nI am running for this election because I want to strengthen my work in areas such as Marketing and Roadmap.  \nAs you know, at the moment we are in the stage of suspension of our ambassador program, but we still have a number of active creators who are ready to continue cooperation. I am convinced that as a project focused on video content creation, we will sooner or later come to the conclusion that interaction with content creators is the key to success. Therefore, I want to discuss and realize this issue in advance and within the scope of the DAO marketing campaign.  \nAlso, as you may have seen, we recently published our roadmap. https://t.co/dS1kVBr85n  \nIn my opinion, it is very cool and so its strict implementation is my priority!',
                      },
                      status: 'FAILED',
                      stakingAccountId: 'j4WimuwF1N3nqff211ifeGSW8q5DW8xWpsjaNf9Feds1MDo5B',
                      votePower: '0',
                      votesReceived: [],
                    },
                    {
                      id: '00000071',
                      member: {
                        id: '515',
                        rootAccount: 'j4SWVha668Nv1YroUkQB68yzfSAjp5xJg4dsXCcKjXJSLwwoa',
                        controllerAccount: 'j4SWVha668Nv1YroUkQB68yzfSAjp5xJg4dsXCcKjXJSLwwoa',
                        boundAccounts: [
                          'j4ReW51wy7KnuUyZEQiJsJdZR3iQFmf3tZ8uaVWW5y1uKHdnF',
                          'j4RP5odJ8pDGFdaCK3a8kEefHwTXvtzz8C3R1G6o9tF5ALwRz',
                          'j4Wg7JSHHLQpxFQfhEB9T57bbeSjFNKpFcoppifCNj3VxWj4C',
                          'j4WkPQ89RT5geSQ3KgL2zsD1dVnD6cgfzKtJWhQQNyrVyfJcb',
                          'j4S8usvaKAZZdYpj9Hp4wsTYbRSh9hg4NwezX5XjXUFWyTvr1',
                          'j4Ue4cDRUmbQ2qXoVfS9p3D7puDQVmZ5dewNAJQeL7a4jif48',
                          'j4VgJtzZKvFbamrzhNATcK69HBrouazF7kx9bnWqQt3zNGKPQ',
                          'j4UQcm2fysev3AQitU11f2byVbxjJw7u3Jz8ftPydHixX8eQ5',
                          'j4USoHhqNrKHEhJCrXY5Lj4g2X9iXRjQ9ZkxijxiFgJB43xPR',
                          'j4Wu1J7oshW9EhFnhriNMJKRXEBaVaKUmr69pdWKZ8ZK644ub',
                          'j4S3furSLyPz5uMZ6FRGmY4Ks53Lj4TCCio1BSoM7EXPGqW6e',
                          'j4SX2fZsSsaatUwPcCWDUGVV5HAd3HoYDWherGrFz5Dg6wJQQ',
                          'j4VSMCK6HsUT2Xiufd7ZtWeFfVAooa7B9SHneR8wBKngEcpVz',
                          'j4VJYdeHRx4BzoLeVjHXquLGcEXjkJb13uu4Wq7awyKB1sJ4E',
                          'j4U8JopV4oAraxF2G6pGp6bk6JKpBkKkPJf7ELeSJu84P9pEa',
                          'j4S3pRewxQgjUj3EuwZ1SYwaEqDqbzBwkP3bLGs5CwJ1D99Q6',
                        ],
                        handle: 'l1dev',
                        metadata: {
                          name: null,
                          about:
                            'FM report: https://github.com/Joystream/community-repo/tree/master/contributions/fm-reports/l1dev',
                          avatar: {
                            __typename: 'AvatarUri',
                            avatarUri: 'https://atlas-services.joystream.org/avatars/migrated/515.webp',
                          },
                          isVerifiedValidator: false,
                        },
                        isVerified: true,
                        isFoundingMember: true,
                        isCouncilMember: false,
                        inviteCount: 2,
                        roles: [
                          {
                            id: 'operationsWorkingGroupAlpha-2',
                            group: {
                              name: 'operationsWorkingGroupAlpha',
                            },
                            createdAt: '2023-01-06T12:15:24.000Z',
                            isLead: false,
                            isActive: false,
                          },
                          {
                            id: 'distributionWorkingGroup-0',
                            group: {
                              name: 'distributionWorkingGroup',
                            },
                            createdAt: '2023-01-04T13:03:30.000Z',
                            isLead: false,
                            isActive: false,
                          },
                          {
                            id: 'appWorkingGroup-3',
                            group: {
                              name: 'appWorkingGroup',
                            },
                            createdAt: '2023-03-30T16:23:30.001Z',
                            isLead: false,
                            isActive: false,
                          },
                          {
                            id: 'appWorkingGroup-5',
                            group: {
                              name: 'appWorkingGroup',
                            },
                            createdAt: '2023-05-30T00:30:48.000Z',
                            isLead: false,
                            isActive: false,
                          },
                        ],
                        createdAt: '2024-11-21T23:37:48.000Z',
                        stakingaccountaddedeventmember: [
                          {
                            createdAt: '2022-12-19T16:47:48.000Z',
                            inBlock: 141522,
                            network: 'OLYMPIA',
                            account: 'j4ReW51wy7KnuUyZEQiJsJdZR3iQFmf3tZ8uaVWW5y1uKHdnF',
                          },
                          {
                            createdAt: '2023-01-02T22:27:54.000Z',
                            inBlock: 346424,
                            network: 'OLYMPIA',
                            account: 'j4RP5odJ8pDGFdaCK3a8kEefHwTXvtzz8C3R1G6o9tF5ALwRz',
                          },
                          {
                            createdAt: '2023-01-03T16:56:06.000Z',
                            inBlock: 357132,
                            network: 'OLYMPIA',
                            account: 'j4Wg7JSHHLQpxFQfhEB9T57bbeSjFNKpFcoppifCNj3VxWj4C',
                          },
                          {
                            createdAt: '2023-01-04T13:36:06.001Z',
                            inBlock: 369532,
                            network: 'OLYMPIA',
                            account: 'j4WkPQ89RT5geSQ3KgL2zsD1dVnD6cgfzKtJWhQQNyrVyfJcb',
                          },
                          {
                            createdAt: '2023-01-04T20:32:24.000Z',
                            inBlock: 373695,
                            network: 'OLYMPIA',
                            account: 'j4S8usvaKAZZdYpj9Hp4wsTYbRSh9hg4NwezX5XjXUFWyTvr1',
                          },
                          {
                            createdAt: '2023-01-05T22:43:54.000Z',
                            inBlock: 389410,
                            network: 'OLYMPIA',
                            account: 'j4Ue4cDRUmbQ2qXoVfS9p3D7puDQVmZ5dewNAJQeL7a4jif48',
                          },
                          {
                            createdAt: '2023-01-19T18:35:00.001Z',
                            inBlock: 588293,
                            network: 'OLYMPIA',
                            account: 'j4VgJtzZKvFbamrzhNATcK69HBrouazF7kx9bnWqQt3zNGKPQ',
                          },
                          {
                            createdAt: '2023-01-19T18:47:24.000Z',
                            inBlock: 588417,
                            network: 'OLYMPIA',
                            account: 'j4UQcm2fysev3AQitU11f2byVbxjJw7u3Jz8ftPydHixX8eQ5',
                          },
                          {
                            createdAt: '2023-01-23T09:45:48.001Z',
                            inBlock: 640426,
                            network: 'OLYMPIA',
                            account: 'j4USoHhqNrKHEhJCrXY5Lj4g2X9iXRjQ9ZkxijxiFgJB43xPR',
                          },
                          {
                            createdAt: '2023-01-23T09:49:18.001Z',
                            inBlock: 640461,
                            network: 'OLYMPIA',
                            account: 'j4Wu1J7oshW9EhFnhriNMJKRXEBaVaKUmr69pdWKZ8ZK644ub',
                          },
                          {
                            createdAt: '2023-03-21T19:15:48.000Z',
                            inBlock: 1466233,
                            network: 'OLYMPIA',
                            account: 'j4S3furSLyPz5uMZ6FRGmY4Ks53Lj4TCCio1BSoM7EXPGqW6e',
                          },
                          {
                            createdAt: '2023-03-29T23:04:54.001Z',
                            inBlock: 1583547,
                            network: 'OLYMPIA',
                            account: 'j4SX2fZsSsaatUwPcCWDUGVV5HAd3HoYDWherGrFz5Dg6wJQQ',
                          },
                          {
                            createdAt: '2023-05-01T14:06:18.000Z',
                            inBlock: 2052380,
                            network: 'OLYMPIA',
                            account: 'j4VSMCK6HsUT2Xiufd7ZtWeFfVAooa7B9SHneR8wBKngEcpVz',
                          },
                          {
                            createdAt: '2023-05-19T11:03:00.000Z',
                            inBlock: 2308757,
                            network: 'OLYMPIA',
                            account: 'j4VJYdeHRx4BzoLeVjHXquLGcEXjkJb13uu4Wq7awyKB1sJ4E',
                          },
                          {
                            createdAt: '2023-06-03T22:21:12.000Z',
                            inBlock: 2530478,
                            network: 'OLYMPIA',
                            account: 'j4U8JopV4oAraxF2G6pGp6bk6JKpBkKkPJf7ELeSJu84P9pEa',
                          },
                          {
                            createdAt: '2023-06-10T02:19:24.000Z',
                            inBlock: 2619240,
                            network: 'OLYMPIA',
                            account: 'j4S3pRewxQgjUj3EuwZ1SYwaEqDqbzBwkP3bLGs5CwJ1D99Q6',
                          },
                        ],
                      },
                      stake: '2500000000000000',
                      noteMetadata: {
                        header: 'l1.media for you',
                        bulletPoints: [
                          'Make the DAO socially relevant by providing actual utility and solve actual problems',
                          'Focus on services',
                        ],
                        bannerImageUri: 'https://joystreamstats.live/static/media/ai-office.jpeg',
                        description:
                          "No self-voting. If elected i'll spend more time to assemble a team and restore l1.media and joystreamstats.live\n\n*   Focus on services\n*   Keep gov atmosphere joyful\n*   For devs it’s currently unattainable to gain big allocations. Provide new opportunities for big contribtutions.\n*   The council/wg reporting system is ineffective to achieve goals.\n*   Create gw for regional growing communities\n*   Make running a gw as easy as mastodon\n*   Put price tags on roadmap items",
                      },
                      status: 'FAILED',
                      stakingAccountId: 'j4Wg7JSHHLQpxFQfhEB9T57bbeSjFNKpFcoppifCNj3VxWj4C',
                      votePower: '0',
                      votesReceived: [],
                    },
                    {
                      id: '0000006y',
                      member: {
                        id: '957',
                        rootAccount: 'j4U6QUxnCrhhbxaLyqXNq6VnVH1Bq5MBzo8wkjaPDsSzUZdbF',
                        controllerAccount: 'j4VoXReFKK1FSTNczaYdcSSC9T96cc1RUb4aja1oXFWKbpMjk',
                        boundAccounts: [
                          'j4U6QUxnCrhhbxaLyqXNq6VnVH1Bq5MBzo8wkjaPDsSzUZdbF',
                          'j4S8ySabhToiXsEzjnzcXAtEDXv1YYzC4rY7VoWopCXrFSpqK',
                          'j4Tgk9dFzGMZk4hW25k9uf4gWfBN8vg3SAc8xbDeQpDyNGEDG',
                          'j4TZHG7owBRZWSbNG6RhiE4hrRdTZvc6yqGUTdVcEKCu9HFnN',
                          'j4VSjLBvfcbBTEMNMGiBUSCXBpxvvyPv3FERAkXpe4BAQ4oQi',
                          'j4U5cu23otryUAE15zq6ZFtdtXf4NQGr4bRcmqpNVBka5NgD2',
                          'j4UBm6X5SPBcMtC9Xr9ExRMAGAjc5XicgJd2Mcy9WcmQUDNLD',
                          'j4VQ8XM23ddHAQQE5sS6yU4RLgLHLNQ84CSJDJ5cK9PYKteYy',
                          'j4W8EQ8Bxzvtf7ngjGNPSm8LQsoRWWH32BhP6qcQQB7xG7p59',
                          'j4SLWkHT47sQGLseyqw85Gaf2dEpN5sNFKpb9yRTrvQfpcFHJ',
                          'j4WQ1qCAjvbPHb4ptizot5XcM2BBq9TrWUgw24NgRH9B3pXQr',
                          'j4UBmT3fUnxxKh24pYqEBWYG7GgkJJ8WpqBJwuk5jjuWNyRvo',
                          'j4SW7xG7PPuTdbZEHAFdnYS3zUaGNtHbtLck2xosY41rMzo2d',
                          'j4WVAzoHp76Qt8qQ5tR9wZPhXoYcqBHHFxgmvVL21T5YMHd7b',
                          'j4Wrd8Pjqh1jeGkgUv95fDegNeijsioBQx4QrEuevDRFU3qpz',
                          'j4VGTrFGj7PKzDPHysicwWh3o8AFTH647Vk4AZAH2fJGsP3VV',
                          'j4UETNicTHDkrUEWjxv9PB3XAY754DREYDRDfeB9aqgeySA9J',
                        ],
                        handle: 'leet_joy',
                        metadata: {
                          name: 'leet_joy',
                          about: 'FM',
                          avatar: {
                            __typename: 'AvatarUri',
                            avatarUri:
                              'https://atlas-services.joystream.org/avatars/d4372f26-9822-4d22-a67c-8f5aec23d187.webp',
                          },
                          isVerifiedValidator: true,
                        },
                        isVerified: true,
                        isFoundingMember: true,
                        isCouncilMember: true,
                        inviteCount: 2,
                        roles: [
                          {
                            id: 'operationsWorkingGroupGamma-0',
                            group: {
                              name: 'operationsWorkingGroupGamma',
                            },
                            createdAt: '2023-01-14T11:24:42.002Z',
                            isLead: false,
                            isActive: false,
                          },
                        ],
                        createdAt: '2025-03-14T04:00:48.000Z',
                        stakingaccountaddedeventmember: [
                          {
                            createdAt: '2023-01-06T14:48:18.000Z',
                            inBlock: 399054,
                            network: 'OLYMPIA',
                            account: 'j4U6QUxnCrhhbxaLyqXNq6VnVH1Bq5MBzo8wkjaPDsSzUZdbF',
                          },
                          {
                            createdAt: '2023-01-23T12:20:42.001Z',
                            inBlock: 641975,
                            network: 'OLYMPIA',
                            account: 'j4S8ySabhToiXsEzjnzcXAtEDXv1YYzC4rY7VoWopCXrFSpqK',
                          },
                          {
                            createdAt: '2023-01-31T18:40:18.000Z',
                            inBlock: 760971,
                            network: 'OLYMPIA',
                            account: 'j4Tgk9dFzGMZk4hW25k9uf4gWfBN8vg3SAc8xbDeQpDyNGEDG',
                          },
                          {
                            createdAt: '2023-02-19T09:25:00.000Z',
                            inBlock: 1028636,
                            network: 'OLYMPIA',
                            account: 'j4TZHG7owBRZWSbNG6RhiE4hrRdTZvc6yqGUTdVcEKCu9HFnN',
                          },
                          {
                            createdAt: '2023-03-09T01:59:18.000Z',
                            inBlock: 1283187,
                            network: 'OLYMPIA',
                            account: 'j4VSjLBvfcbBTEMNMGiBUSCXBpxvvyPv3FERAkXpe4BAQ4oQi',
                          },
                          {
                            createdAt: '2023-03-21T17:07:06.000Z',
                            inBlock: 1464946,
                            network: 'OLYMPIA',
                            account: 'j4U5cu23otryUAE15zq6ZFtdtXf4NQGr4bRcmqpNVBka5NgD2',
                          },
                          {
                            createdAt: '2023-06-25T13:31:30.000Z',
                            inBlock: 2841634,
                            network: 'OLYMPIA',
                            account: 'j4UBm6X5SPBcMtC9Xr9ExRMAGAjc5XicgJd2Mcy9WcmQUDNLD',
                          },
                          {
                            createdAt: '2023-08-05T17:28:30.001Z',
                            inBlock: 3433271,
                            network: 'OLYMPIA',
                            account: 'j4VQ8XM23ddHAQQE5sS6yU4RLgLHLNQ84CSJDJ5cK9PYKteYy',
                          },
                          {
                            createdAt: '2023-08-17T21:09:06.000Z',
                            inBlock: 3607907,
                            network: 'OLYMPIA',
                            account: 'j4W8EQ8Bxzvtf7ngjGNPSm8LQsoRWWH32BhP6qcQQB7xG7p59',
                          },
                          {
                            createdAt: '2023-08-29T00:36:36.000Z',
                            inBlock: 3767651,
                            network: 'OLYMPIA',
                            account: 'j4SLWkHT47sQGLseyqw85Gaf2dEpN5sNFKpb9yRTrvQfpcFHJ',
                          },
                          {
                            createdAt: '2023-10-17T05:14:48.000Z',
                            inBlock: 4474973,
                            network: 'OLYMPIA',
                            account: 'j4WQ1qCAjvbPHb4ptizot5XcM2BBq9TrWUgw24NgRH9B3pXQr',
                          },
                          {
                            createdAt: '2023-12-27T16:11:36.000Z',
                            inBlock: 5499565,
                            network: 'OLYMPIA',
                            account: 'j4UBmT3fUnxxKh24pYqEBWYG7GgkJJ8WpqBJwuk5jjuWNyRvo',
                          },
                          {
                            createdAt: '2024-02-05T13:55:36.000Z',
                            inBlock: 6073114,
                            network: 'OLYMPIA',
                            account: 'j4SW7xG7PPuTdbZEHAFdnYS3zUaGNtHbtLck2xosY41rMzo2d',
                          },
                          {
                            createdAt: '2024-03-05T21:08:06.000Z',
                            inBlock: 6491625,
                            network: 'OLYMPIA',
                            account: 'j4WVAzoHp76Qt8qQ5tR9wZPhXoYcqBHHFxgmvVL21T5YMHd7b',
                          },
                          {
                            createdAt: '2024-08-20T10:49:54.001Z',
                            inBlock: 8895002,
                            network: 'OLYMPIA',
                            account: 'j4Wrd8Pjqh1jeGkgUv95fDegNeijsioBQx4QrEuevDRFU3qpz',
                          },
                          {
                            createdAt: '2024-08-20T17:56:06.000Z',
                            inBlock: 8899214,
                            network: 'OLYMPIA',
                            account: 'j4VGTrFGj7PKzDPHysicwWh3o8AFTH647Vk4AZAH2fJGsP3VV',
                          },
                          {
                            createdAt: '2024-11-19T17:59:06.000Z',
                            inBlock: 10206444,
                            network: 'OLYMPIA',
                            account: 'j4UETNicTHDkrUEWjxv9PB3XAY754DREYDRDfeB9aqgeySA9J',
                          },
                        ],
                      },
                      stake: '1666666666660000',
                      noteMetadata: {
                        header: 'leet_joy',
                        bulletPoints: ['high exp as cm', 'hodler'],
                        bannerImageUri:
                          'https://github.com/Joystream/founding-members/blob/main/avatars/selected-avatars/42-leet_joy.png?raw=true',
                        description:
                          "Hello everyone, [_**@leet\\_joy**_](#mention?member-id=957) and I'm ready to continue work as CM in Term 44, supporting protocol adoption and development.\n\nPriorities :\n\n*   Builders: SDK & Infrastructure authentication;\n*   Infrastructure: cost optimization, reduce number of active hosts to 4\n*   Marketing: strengthen the team, increase content reach\n*   Content: delete large trash files, improve top video in categories\n\nWhen it comes to spending, I would opt for a conservative plan and not exceed 0.5% inflation per term. \n\nPrevious council applications:\n\n*   [Term 43](https://pioneerapp.xyz/#/election/past-elections/43?candidate=0000006v)\n*   [Term 42](https://pioneerapp.xyz/#/election/past-elections/42?candidate=0000006s)\n*   [Term 41](https://pioneerapp.xyz/#/election/past-elections/41?candidate=0000006n)\n*   [Term 40](https://pioneerapp.xyz/#/election/past-elections/40?candidate=0000006k)",
                      },
                      status: 'ELECTED',
                      stakingAccountId: 'j4TZHG7owBRZWSbNG6RhiE4hrRdTZvc6yqGUTdVcEKCu9HFnN',
                      votePower: '143333330000000000',
                      votesReceived: [
                        {
                          id: '00000381',
                        },
                      ],
                    },
                  ],
                  castVotes: [
                    {
                      stake: '1666700000000',
                      stakeLocked: true,
                      voteForId: '00000072',
                      castBy: 'j4SEkmk9DM2TScQiPX4tcPxDHPXAKJQzuzbwJ6CiHMWrw7c2m',
                    },
                    {
                      stake: '1779950000000000',
                      stakeLocked: true,
                      voteForId: '00000072',
                      castBy: 'j4UBmT3fUnxxKh24pYqEBWYG7GgkJJ8WpqBJwuk5jjuWNyRvo',
                    },
                    {
                      stake: '895000000000000',
                      stakeLocked: true,
                      voteForId: '00000072',
                      castBy: 'j4UBm6X5SPBcMtC9Xr9ExRMAGAjc5XicgJd2Mcy9WcmQUDNLD',
                    },
                    {
                      stake: '1618390000000000',
                      stakeLocked: true,
                      voteForId: null,
                      castBy: 'j4VoXReFKK1FSTNczaYdcSSC9T96cc1RUb4aja1oXFWKbpMjk',
                    },
                  ],
                  nextElectedCouncil,
                },
              },
            },
          ],
        },
      }
    },
  },
} satisfies Meta

export const Default: Story = {}
