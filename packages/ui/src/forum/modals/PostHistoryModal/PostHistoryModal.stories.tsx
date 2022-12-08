import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { PostHistoryModal } from '@/forum/modals/PostHistoryModal/PostHistoryModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RawForumCategoryMock, RawForumPostMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import { getMember } from '../../../../test/_mocks/members'

export default {
  title: 'Forum/PostHistoryModal',
  component: PostHistoryModal,
} as Meta

const Template: Story = (args) => {
  return (
    <MockApolloProvider members forum={args.forum}>
      <ModalContext.Provider
        value={{
          modalData: {
            postId: '0:0',
            author: getMember('alice'),
          },
          hideModal: () => undefined,
          showModal: () => undefined,
          modal: 'PostHistoryModal',
        }}
      >
        <PostHistoryModal />
      </ModalContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
const forum: {
  categories: RawForumCategoryMock[]
  threads: RawForumThreadMock[]
  posts: RawForumPostMock[]
} = {
  categories: [
    {
      id: '0',
      title: 'Category 0',
      description: 'Category description',
      parentId: null,
      moderatorIds: [],
      status: { __typename: 'CategoryStatusActive' },
    },
  ],
  threads: [
    {
      id: '0',
      categoryId: '0',
      isSticky: false,
      title: 'Fanart thread',
      authorId: '0',
      createdInEvent: {
        inBlock: 4547,
        createdAt: '2021-05-06T11:24:13.944Z',
        network: 'OLYMPIA',
      },
      status: { __typename: 'ThreadStatusActive' },
      visiblePostsCount: 11,
    },
  ],
  posts: [
    {
      id: '0:0',
      threadId: '0',
      authorId: '0',
      text: 'vero harum est eos officiis possimus maiores nam impedit cum et atque consequuntur ut soluta rem iste laboriosam dolorem perferendis aut est laudantium quas',
      edits: [
        {
          newText:
            'odio omnis voluptatem illum fuga sit sit natus numquam recusandae qui in velit et illum minima rem vel non quas autem reiciendis nemo vel nostrum tenetur temporibus et molestiae fuga qui',
          inBlock: 9048,
          createdAt: '2021-07-06T09:25:16.422Z',
          network: 'OLYMPIA',
        },
        {
          newText:
            'quas mollitia ratione et impedit quaerat repellat consequatur magnam in dolor fugiat maxime fuga dolores rerum pariatur nobis aut explicabo ut pariatur dolor voluptatem ut ullam eaque aut aut mollitia sed dolor non nesciunt est quia pariatur nisi quisquam ratione unde magni ut unde corrupti suscipit assumenda non provident incidunt tempora nulla et voluptatem veritatis et',
          inBlock: 7260,
          createdAt: '2021-07-31T20:27:10.494Z',
          network: 'OLYMPIA',
        },
        {
          newText:
            'amet et ullam dolorem eius quaerat nemo enim reprehenderit ex magni modi enim doloribus veniam unde iure natus officia repellat tempora omnis exercitationem animi eos voluptates vero sint dolores praesentium perferendis illum sit vel voluptatem rem aut minima nulla quia itaque vero aut est quasi veniam ab ut nostrum sit iusto enim repellendus aut itaque architecto sit harum modi libero mollitia et quo quia iste cupiditate impedit labore nobis veniam quis sit aliquid autem perspiciatis reiciendis eaque aut rerum porro facere velit quam et delectus ratione molestias sapiente',
          inBlock: 5070,
          createdAt: '2021-08-04T03:11:21.676Z',
          network: 'OLYMPIA',
        },
        {
          newText: 'quo doloribus beatae magni aut dolores voluptate ut animi aut quo eum unde',
          inBlock: 3859,
          createdAt: '2021-08-06T09:12:23.137Z',
          network: 'OLYMPIA',
        },
      ],
      postAddedEvent: {
        inBlock: 4562,
        createdAt: '2021-05-27T22:46:06.046Z',
        network: 'OLYMPIA',
        text: 'xime fuga dolores rerum pariatur nobis aut explicabo ut pariatur dolor voluptatem ut ullam eaque aut aut mollitia sed dolor non nesciunt',
      },
      status: 'PostStatusActive',
      deletedInEvent: null,
      postModeratedEvent: null,
    },
  ],
}

Default.args = {
  forum,
}
