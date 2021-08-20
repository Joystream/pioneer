import { RawForumCategoryMock } from '@/mocks/data/seedForum'

export const mockCategories: RawForumCategoryMock[] = [
  {
    id: '0',
    title: 'Category 0',
    description: 'Root category',
    parentId: null,
    moderatorIds: [],
    status: { __typename: 'CategoryStatusActive' },
  },
  {
    id: '1',
    title: 'ab fugiat et quas est',
    description:
      'Sint voluptatem dolor praesentium esse earum omnis et. Velit impedit suscipit optio quia eveniet eligendi sequi. Et est quo corporis voluptate est eaque. Nihil cumque rem explicabo quidem aut.',
    parentId: '0',
    moderatorIds: [],
    status: { __typename: 'CategoryStatusActive' },
  },
  {
    id: '2',
    title: 'facilis debitis dolore repellat voluptates',
    description:
      'Fugiat beatae repellendus quia doloremque eum commodi. Harum porro quasi repudiandae tempore at dolores praesentium. Unde reprehenderit illum consectetur minus molestiae cum. Id dignissimos et officiis consequatur.',
    parentId: '1',
    moderatorIds: [],
    status: { __typename: 'CategoryStatusActive' },
  },
  {
    id: '3',
    title: 'ratione maxime reiciendis hic quasi',
    description:
      'Excepturi recusandae voluptas eveniet ea. Autem quod neque et non consequatur error est quisquam. Rem voluptas odit sed facilis facere vel. Et ut recusandae sit sint et est dolorem aliquid. Sunt et aut repudiandae magni aliquam aperiam. Enim eveniet enim earum nulla similique debitis ab ut.',
    parentId: '2',
    moderatorIds: [],
    status: { __typename: 'CategoryStatusActive' },
  },
  {
    id: '4',
    title: 'reprehenderit qui beatae est',
    description:
      'Eos non labore id numquam nihil non debitis. Distinctio ea illum velit suscipit omnis officia. Sed minima nobis ea expedita.',
    parentId: '3',
    moderatorIds: [],
    status: { __typename: 'CategoryStatusActive' },
  },
  {
    id: '5',
    title: 'non iure ex odit',
    description:
      'Nihil magnam eligendi deserunt sint provident repellat et. Quas suscipit reprehenderit nostrum. Fuga placeat dolorem omnis aspernatur corporis dolore praesentium dolores.',
    parentId: '3',
    moderatorIds: [],
    status: { __typename: 'CategoryStatusActive' },
  },
]
