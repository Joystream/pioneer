import React from 'react'

import { SmallFileUpload } from '@/common/components/SmallFileUpload/SmallFileUpload'

export default {
  title: 'Common/Forms/SmallFileUpload',
  components: SmallFileUpload,
}

export const Default = () => {
  return <SmallFileUpload name="storybook.smallFileUpload" onUpload={() => undefined} />
}
