import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { SearchResultsModal } from './SearchResultsModal'

export default {
  title: 'Common/Search/SearchResultsModal',
  component: SearchResultsModal,
  argTypes: {
    hideModal: { action: 'hideModal' },
    showModal: { action: 'showModal' },
  },
} as Meta

interface Props {
  search: string
  hideModal: () => void
  showModal: () => void
}
const Template: Story<Props> = ({ search, hideModal, showModal }) => {
  const modalData = { search }
  return (
    <MockApolloProvider members workers workingGroups forum>
      <ModalContext.Provider value={{ modalData, modal: null, hideModal, showModal }}>
        <SearchResultsModal />
      </ModalContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  search: 'dolor',
}
