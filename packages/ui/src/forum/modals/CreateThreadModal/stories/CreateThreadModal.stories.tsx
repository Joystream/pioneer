import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'

import { MockQueryNodeProviders } from '../../../../../test/_mocks/providers'
import { CreateThreadDetailsModal } from '../CreateThreadDetailsModal'

export default {
  title: 'Forum/CreateThreadModal/CreateThreadDetailsModal',
  component: CreateThreadDetailsModal,
} as Meta

const Template: Story = () => {
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const context = { topic, description }
  return (
    <>
      <HashRouter>
        <MockQueryNodeProviders>
          <ModalContext.Provider
            value={{
              modalData: {},
              showModal: () => undefined,
              hideModal: () => undefined,
              modal: null,
            }}
          >
            <CreateThreadDetailsModal
              context={context}
              setTopic={setTopic}
              setDescription={setDescription}
              onSubmit={() => null}
            />
          </ModalContext.Provider>
        </MockQueryNodeProviders>
      </HashRouter>
    </>
  )
}

export const GeneralDetails = Template.bind({})
