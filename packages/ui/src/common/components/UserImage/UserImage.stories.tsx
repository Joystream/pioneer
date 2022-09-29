import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ImageReportContext } from '@/common/providers/imageReports/context'

import { UserImage, UserImageProps } from './UserImage'

export default {
  title: 'Common/UserImage',
  component: UserImage,
} as Meta

const Template: Story<UserImageProps & { blacklistedImages: string[] }> = (args) => (
  <ImageReportContext.Provider
    value={{
      blacklistedImages: [],
      userReportedImages: [],
      notificationStatus: 'empty',
      hideNotification: () => undefined,
      reportFormUrl: () => '',
    }}
  >
    <UserImage {...args} />
  </ImageReportContext.Provider>
)

export const Default = Template.bind({})
Default.args = {
  src: 'https://picsum.photos/seed/0NTA4Njg5OTE5ODU5OTgz/400/300.jpg',
  blacklistedImages: [],
}
