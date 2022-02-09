import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ArrowRightIcon } from '@/common/components/icons'
import { ConnectIcon } from '@/common/components/icons/ConnectIcon'
import { BannerWrapper } from '@/common/components/storybookParts/previewStyles'
import { Banner } from '@/overview/components/Banners/Banners'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

export default {
  title: 'Overview/Banner',
  component: Banner,
} as Meta

export const Normal: Story = () => {
  return (
    <MemoryRouter>
      <BannerWrapper>
        <Banner
          bannerTitle="APPLICATIONS"
          title="Working Groups"
          icon={<ConnectIcon />}
          description="Join a working group and become an active member lorem ipsum dolor adipiscing elit neque massa, dignissim a finibus a, egestas"
          buttonText="Go to Working Groups"
          buttonIcon={<ArrowRightIcon />}
          path={WorkingGroupsRoutes.groups}
        />
      </BannerWrapper>
    </MemoryRouter>
  )
}
