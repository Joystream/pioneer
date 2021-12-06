import { RawForumPostMock } from '@/mocks/data/seedForum'

export const mockPosts: RawForumPostMock[] = [
  {
    id: '0',
    threadId: '0',
    authorId: '0',
    text: 'ducimus aspernatur veniam in sint sint voluptas aspernatur quia veniam cum et aut in voluptatibus sunt explicabo dolores aspernatur sit minima non blanditiis odio blanditiis quisquam ratione sed illo facere recusandae nulla vel voluptatem magni blanditiis sapiente excepturi tempora commodi ut perspiciatis quasi provident sint repellat rerum veritatis accusantium quia quisquam eaque sequi repellendus fugit ea cupiditate sapiente eaque aut quis excepturi inventore repudiandae eaque cum',
    edits: [
      {
        newText:
          'aut ut est atque officiis voluptatibus nulla voluptates doloremque non et hic voluptates molestias veniam est natus odio tempora vel vel incidunt voluptas sint autem voluptatibus neque aliquam dolor cum porro sit voluptatem debitis rerum nisi illo exercitationem sunt id placeat sint sint repellendus enim non vel',
        inBlock: 9515,
        createdAt: '2021-07-02T04:22:13.523Z',
        network: 'OLYMPIA',
      },
      {
        newText:
          'ut voluptatum deserunt odio ut ipsum qui et quas libero commodi quo sint consequatur magnam accusamus dolor et veniam quisquam neque sint aut accusantium temporibus nemo delectus earum velit harum deleniti saepe quia voluptatibus voluptas et non molestiae ab consequuntur facere nemo nam molestiae ut quis autem quibusdam fuga laborum commodi quis maxime nihil voluptates iure enim voluptatem vel sequi',
        inBlock: 643,
        createdAt: '2021-07-20T12:31:08.533Z',
        network: 'OLYMPIA',
      },
    ],
    postAddedEvent: {
      inBlock: 5465,
      createdAt: '2021-06-28T09:15:47.156Z',
      network: 'OLYMPIA',
      text: 'ducimus necessitatibus dolorum molestiae quia saepe nemo aliquam harum pariatur enim ut porro cupiditate ut explicabo fugit accusantium porro velit aperiam rerum consequatur voluptatem reprehenderit debitis repellendus ea et sed eveniet non qui ut assumenda rerum deserunt sit molestiae voluptatem aut',
    },
    status: 'PostStatusActive',
    deletedInEvent: null,
    postModeratedEvent: null,
  },
  {
    id: '1',
    threadId: '0',
    authorId: '1',
    text: 'ducimus necessitatibus dolorum molestiae quia saepe nemo aliquam harum pariatur enim ut porro cupiditate ut explicabo fugit accusantium porro velit aperiam rerum consequatur voluptatem reprehenderit debitis repellendus ea et sed eveniet non qui ut assumenda rerum deserunt sit molestiae voluptatem aut',
    edits: [],
    postAddedEvent: {
      inBlock: 885,
      createdAt: '2021-04-22T17:54:04.747Z',
      network: 'OLYMPIA',
      text: 'ducimus necessitatibus dolorum molestiae quia saepe nemo aliquam harum pariatur enim ut porro cupiditate ut explicabo fugit accusantium porro velit aperiam rerum consequatur voluptatem reprehenderit debitis repellendus ea et sed eveniet non qui ut assumenda rerum deserunt sit molestiae voluptatem aut',
    },
    status: 'PostStatusActive',
    deletedInEvent: null,
    postModeratedEvent: null,
  },
]
