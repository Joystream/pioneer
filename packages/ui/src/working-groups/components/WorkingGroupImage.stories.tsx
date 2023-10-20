import { Meta, Story } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { Row, TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { BorderRad, Colors, Transitions } from '@/common/constants'

import { WorkingGroupImage, WorkingGroupImageProps, WorkingGroupImageTag } from './WorkingGroupImage'

export default {
  title: 'WorkingGroup/WorkingGroupImagePlaceholder',
  component: WorkingGroupImage,
} as Meta

const Template: Story<WorkingGroupImageProps> = (args) => {
  return (
    <TemplateBlock>
      <Row>
        <GroupImageContainer>
          <WorkingGroupImage {...args} />
        </GroupImageContainer>
        <GroupImageContainer>
          <WorkingGroupImage groupName={undefined} />
        </GroupImageContainer>
      </Row>
      <Row>
        Group names: bandwidth, storage, forum, membership, content, discovery, operations, apps, council or{' '}
        {'{undefined}'}
      </Row>
    </TemplateBlock>
  )
}

export const WGImagePlaceholder = Template.bind({})

WGImagePlaceholder.args = {
  groupName: 'forum',
}

const GroupImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 108px;
  height: 108px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  overflow: hidden;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover {
    border-color: ${Colors.Blue[100]};

    ${WorkingGroupImageTag} {
      transform: scale(1.1);
    }
  }
`
