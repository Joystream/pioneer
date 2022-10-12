import { Meta } from '@storybook/react'
import React from 'react'

import { MaintenanceScreen } from '@/common/components/page/MaintenanceScreen/MaintenanceScreen'

export default {
  title: 'Common/MaintenanceScreen',
  component: MaintenanceScreen,
  parameters: {
    backgrounds: {
      default: 'Black',
    },
  },
} as Meta

export const Default = () => <MaintenanceScreen />
