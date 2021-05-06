import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { Stepper } from '../../common/components/Stepper'
import { StepDescriptionColumn, StepperModalBody, StepperModalWrapper } from '../../common/components/StepperModal'

import { OpeningFormPreview, OpeningFormPreviewProps } from './OpeningFormPreview'

export default {
  title: 'WorkingGroup/OpeningFormPreview',
  component: OpeningFormPreview,
} as Meta

const Template: Story<OpeningFormPreviewProps> = (args) => (
  <StepperModalBody>
    <StepperModalWrapper>
      <Stepper steps={[{ title: 'Foo step' }]} active={-1} />
      <StepDescriptionColumn>
        <OpeningFormPreview {...args} />
      </StepDescriptionColumn>
      <div>&nbsp;</div>
    </StepperModalWrapper>
  </StepperModalBody>
)

export const Default = Template.bind({})

Default.args = {
  opening: {
    id: '123',
    groupId: '0',
    groupName: 'Distribution',
    budget: 1000,
    title: 'Storage working group leader',
    shortDescription: 'Become A Distribution Leader',
    details: 'Opening details',
    description:
      '### Intro\n\nContent Curators will one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated.\n\n#### Details\n\nOur current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.',
    expectedEnding: '2022-03-09T10:18:04.155Z',
    type: 'LEADER',
    reward: { value: new BN(1000), interval: 3600 },
    applicants: { current: 2, total: 10 },
    hiring: { current: 0, total: 1 },
    status: 'OpeningStatusOpen',
    stake: new BN(2000),
  },
}
