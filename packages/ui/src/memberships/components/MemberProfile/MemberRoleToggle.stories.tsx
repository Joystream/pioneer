import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock, ModalBlock, WhiteBlock } from '../../../common/components/storybookParts/previewStyles'

import { MemberRoleToggle, MemberRoleToggleProps } from './MemberRoleToggle'

export default {
  title: 'Member/MemberRoleToggle',
  component: MemberRoleToggle,
} as Meta

const Template: Story<MemberRoleToggleProps> = (args) => (
  <TemplateBlock>
    <ModalBlock>
      <MemberRoleToggle {...args} />
    </ModalBlock>
    <WhiteBlock>
      <MemberRoleToggle {...args} />
    </WhiteBlock>
  </TemplateBlock>
)

export const Default = Template.bind({})
Default.args = {
  member: {
    id: '0',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: false,
    isFoundingMember: false,
    roles: [],
    inviteCount: 0,
  },
  role: 'Some Role Name',
}
