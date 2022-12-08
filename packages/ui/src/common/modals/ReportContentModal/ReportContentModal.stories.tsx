import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ImageReportContext } from '@/common/providers/imageReports/context'
import { ModalContext } from '@/common/providers/modal/context'

import { ReportContentModal } from './ReportContentModal'

export default {
  title: 'Common/Modals/ReportContentModal',
  component: ReportContentModal,
} as Meta

const Template: Story = ({ report, reportFormUrl, userReportedImages }) => (
  <ModalContext.Provider
    value={{
      modal: 'ReportContentModal',
      hideModal: () => undefined,
      showModal: () => undefined,
      modalData: { report },
    }}
  >
    <ImageReportContext.Provider
      value={{
        blacklistedImages: [],
        userReportedImages,
        notificationStatus: 'empty',
        hideNotification: () => undefined,
        reportFormUrl: () => encodeURI(reportFormUrl),
      }}
    >
      <ReportContentModal />
    </ImageReportContext.Provider>
  </ModalContext.Provider>
)

export const Default = Template.bind({})
Default.args = {
  report: 'https://picsum.photos/seed/0NTA4Njg5OTE5ODU5OTgz/300/200.jpg',
  userReportedImages: ['https://picsum.photos/seed/0NTA4Njg5OTE5ODU5OTgz/300/200.jpg'],
  reportFormUrl: 'mailto:you@example.com?subject=Report image&body=Reported: {image}\nFound at: {context}',
}
