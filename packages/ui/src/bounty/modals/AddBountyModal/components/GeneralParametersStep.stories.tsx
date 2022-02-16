import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { GeneralParametersStep } from '@/bounty/modals/AddBountyModal/components/GeneralParametersStep'
import { Member } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'bounty/AddBountyModal/GeneralParametersStep',
  component: GeneralParametersStep,
} as Meta

const GeneralParametersStepTemplate: Story = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverPhotoLink, setCoverPhoto] = useState('')
  const [activeMember] = useState<Member>()

  return (
    <MockApolloProvider members>
      <GeneralParametersStep
        setTitle={setTitle}
        activeMember={activeMember}
        setCoverPhoto={setCoverPhoto}
        setDescription={setDescription}
        title={title}
        coverPhotoLink={coverPhotoLink}
        description={description}
      />
    </MockApolloProvider>
  )
}

export const Default = GeneralParametersStepTemplate.bind({})
