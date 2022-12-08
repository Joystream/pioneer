import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ModalContext } from '../../providers/modal/context'
import { TemplateBlock } from '../storybookParts/previewStyles'

import { Notifications } from '.'

export default {
  title: 'Common/Notifications',
  component: Notifications,
} as Meta

const Template: Story = () => (
  <MockApolloProvider members council forum proposals workers workingGroups>
    <ModalContext.Provider
      value={{
        showModal: () => null,
        hideModal: () => null,
        modal: '',
        modalData: {},
      }}
    >
      <TemplateBlock>
        <Notifications onClose={() => null} isNotificationsPanelOpen={true} />
      </TemplateBlock>
    </ModalContext.Provider>
  </MockApolloProvider>
)

export const Default = Template.bind({})
