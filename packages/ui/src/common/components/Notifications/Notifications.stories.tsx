import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ModalContext } from '../../providers/modal/context'
import { TemplateBlock } from '../storybookParts/previewStyles'

import { Notifications } from '.'

export default {
  title: 'Common/Notifications',
  component: Notifications,
} as Meta

const Template: Story = () => (
  <MemoryRouter>
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
  </MemoryRouter>
)

export const Default = Template.bind({})
