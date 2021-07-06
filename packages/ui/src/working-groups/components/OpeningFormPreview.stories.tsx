import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Stepper, StepDescriptionColumn, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'

import { getMockAsOpening } from '../../mocks/data/seedOpenings'

import { OpeningFormPreview, OpeningFormPreviewProps } from './OpeningFormPreview'

export default {
  title: 'WorkingGroup/OpeningFormPreview',
  component: OpeningFormPreview,
} as Meta

const Template: Story<OpeningFormPreviewProps> = (args) => (
  <StepperModalBody>
    <StepperModalWrapper>
      <Stepper steps={[{ title: 'Foo step', type: 'next' }]} />
      <StepDescriptionColumn>
        <OpeningFormPreview {...args} />
      </StepDescriptionColumn>
      <div>&nbsp;</div>
    </StepperModalWrapper>
  </StepperModalBody>
)

export const Default = Template.bind({})

Default.args = {
  opening: getMockAsOpening(),
}
