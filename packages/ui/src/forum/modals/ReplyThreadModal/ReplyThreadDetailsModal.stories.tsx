import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'

import { getMember } from '../../../../test/_mocks/members'
import { MockApolloProvider } from '../../../../test/_mocks/providers'

import { ReplyThreadDetailsModal } from './ReplyThreadDetailsModal'

export default {
  title: 'Forum/ReplyThreadModal/ReplyThreadDetailsModal',
  component: ReplyThreadDetailsModal,
} as Meta

const Template: Story = ({ breadcrumbs, post, send }) => {
  return (
    <>
      <HashRouter>
        <MockApolloProvider>
          <ModalContext.Provider
            value={{
              modalData: {},
              showModal: () => undefined,
              hideModal: () => undefined,
              modal: null,
            }}
          >
            <ReplyThreadDetailsModal breadcrumbs={breadcrumbs} author={getMember('alice')} post={post} send={send} />
          </ModalContext.Provider>
        </MockApolloProvider>
      </HashRouter>
    </>
  )
}

export const GeneralDetails = Template.bind({})
GeneralDetails.args = {
  breadcrumbs: [
    { id: '0', title: 'Help' },
    { id: '1', title: 'Working Groups' },
    { id: '2', title: 'Storage' },
  ],
}
