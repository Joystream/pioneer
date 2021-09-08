import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'

import { getMember } from '../../../../test/_mocks/members'
import { MockApolloProvider } from '../../../../test/_mocks/providers'

import { CreateThreadDetailsModal } from './CreateThreadDetailsModal'

export default {
  title: 'Forum/CreateThreadModal/CreateThreadDetailsModal',
  component: CreateThreadDetailsModal,
} as Meta

const Template: Story = ({ breadcrumbs }) => {
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
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
            <CreateThreadDetailsModal
              topic={topic}
              description={description}
              setTopic={setTopic}
              setDescription={setDescription}
              onSubmit={() => null}
              breadcrumbs={breadcrumbs}
              author={getMember('alice')}
            />
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
