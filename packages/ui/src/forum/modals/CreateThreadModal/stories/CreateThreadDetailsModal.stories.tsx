import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'

import { MockApolloProvider } from '../../../../../test/_mocks/providers'
import { CreateThreadDetailsModal } from '../CreateThreadDetailsModal'

export default {
  title: 'Forum/CreateThreadModal/CreateThreadDetailsModal',
  component: CreateThreadDetailsModal,
} as Meta

const Template: Story = () => {
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
            />
          </ModalContext.Provider>
        </MockApolloProvider>
      </HashRouter>
    </>
  )
}

export const GeneralDetails = Template.bind({})
