import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Row, ModalBlock, Column, TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { MemberRoles, MemberRolesProps, MemberRoleHelpGroup } from './MemberRoles'

export default {
  title: 'Member/MemberRoles',
  component: MemberRoles,
} as Meta

const Template: Story<MemberRolesProps & MemberRoleHelpGroup> = () => (
  <TemplateBlock>
    <ModalBlock>
      <Column>
        <Row>No roles:</Row>
        <Row>
          <MemberRoles roles={[]} />
        </Row>
      </Column>
    </ModalBlock>
    <ModalBlock>
      <Column>
        <Row>'Less then max' roles (max is 5):</Row>
        <Row>
          <MemberRoles
            max={5}
            roles={[
              { groupName: 'Big group', isLeader: false },
              { groupName: 'Forum', isLeader: true },
              { groupName: "Long group name, let's check it", isLeader: false },
              { groupName: 'Storage', isLeader: true },
            ]}
          />
        </Row>
      </Column>
    </ModalBlock>
    <ModalBlock>
      <Column>
        <Row>'More then max' roles (max is 3):</Row>
        <Row>
          <MemberRoles
            max={3}
            roles={[
              { groupName: 'Big group', isLeader: false },
              { groupName: 'Forum', isLeader: true },
              { groupName: "Long group name, let's check it", isLeader: false },
              { groupName: 'Storage', isLeader: true },
              { groupName: 'More', isLeader: true },
            ]}
          />
        </Row>
      </Column>
    </ModalBlock>
    <ModalBlock>
      <Column>
        <Row>'Some duplicated' roles (max is 3):</Row>
        <Row>
          <MemberRoles
            max={3}
            roles={[
              { groupName: 'Big group', isLeader: false },
              { groupName: 'Forum', isLeader: true },
              { groupName: "Long group name, let's check it", isLeader: false },
              { groupName: 'Storage', isLeader: true },
              { groupName: 'First', isLeader: true },
              { groupName: 'More', isLeader: true },
              { groupName: 'Extra', isLeader: true },
            ]}
          />
        </Row>
      </Column>
    </ModalBlock>
  </TemplateBlock>
)

export const Default = Template.bind({})
