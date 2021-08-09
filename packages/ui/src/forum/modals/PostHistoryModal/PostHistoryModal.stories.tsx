import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { PostHistoryModal } from '@/forum/modals/PostHistoryModal/PostHistoryModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Forum/PostHistoryModal',
  component: PostHistoryModal,
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider workingGroups workers members forum>
      <ModalContext.Provider
        value={{
          modalData: {
            postId: '1',
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
