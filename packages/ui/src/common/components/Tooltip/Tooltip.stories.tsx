import { Meta, Story } from '@storybook/react'
import faker from 'faker'
import React from 'react'
import styled from 'styled-components'

import { TemplateBlock } from '../storybookParts/previewStyles'

import { Tooltip, TooltipDefault, TooltipPopupProps, TooltipProps } from '.'

export default {
  title: 'Common/Tooltip',
  component: Tooltip,
} as Meta

const Template: Story<TooltipProps & TooltipPopupProps> = () => {
  return (
    <TemplateBlock>
      <TooltipWrapper>
        <Tooltip tooltipText={faker.lorem.words(6)}>
          <TooltipDefault />
        </Tooltip>
        <Tooltip tooltipText={faker.lorem.words(6)}>
          <TooltipDefault />
        </Tooltip>
        <Tooltip tooltipText={faker.lorem.words(6)}>
          <TooltipDefault />
        </Tooltip>
        <Tooltip tooltipText={faker.lorem.words(6)}>
          <TooltipDefault />
        </Tooltip>
      </TooltipWrapper>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})

Default.args = {}

const TooltipWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16px, 24px));
  grid-row-gap: 4px;
  grid-column-gap: 4px;
`
