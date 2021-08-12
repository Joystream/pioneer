import { Meta, Story } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router'

import { Loading } from '@/common/components/Loading'
import { ThreadData } from '@/forum/helpers/storybook'
import { asForumThread, ForumThread } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ThreadList } from './ThreadList'

export default {
  title: 'Forum/Threads/ThreadList',
  component: ThreadList,
} as Meta

const Template: Story = () => {
  const [threads, setThreads] = useState<ForumThread[]>([])

  useEffect(() => {
    import('@/mocks/data/raw/forumThreads.json').then((rawThreads) => {
      const threads = (rawThreads.default as ThreadData[]).slice(0, 10).map(asForumThread)
      setThreads(threads)
    })
  }, [])

  return (
    <MockApolloProvider members workers forum>
      <MemoryRouter>{threads ? <ThreadList threads={threads} /> : <Loading />}</MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
