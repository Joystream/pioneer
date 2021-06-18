import { Meta, Story } from '@storybook/react'
import * as faker from 'faker'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Row, ModalBlock, Column, TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { MemberRoles, MemberRolesProps, MemberRoleHelpGroup } from './MemberRoles'

export default {
  title: 'Member/MemberRoles',
  component: MemberRoles,
} as Meta

const Template: Story<MemberRolesProps & MemberRoleHelpGroup> = () => (
  <HashRouter>
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
                { groupName: 'Big group', isLeader: false, createdAt: faker.date.recent(30).toISOString() },
                { groupName: 'Forum', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
                {
                  groupName: "Long group name, let's check it",
                  isLeader: false,
                  createdAt: faker.date.recent(30).toISOString(),
                },
                { groupName: 'Storage', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
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
                { groupName: 'Big group', isLeader: false, createdAt: faker.date.recent(30).toISOString() },
                { groupName: 'Forum', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
                {
                  groupName: "Long group name, let's check it",
                  isLeader: false,
                  createdAt: faker.date.recent(30).toISOString(),
                },
                { groupName: 'Storage', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
                { groupName: 'More', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
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
                { groupName: 'Big group', isLeader: false, createdAt: faker.date.recent(30).toISOString() },
                { groupName: 'Forum', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
                {
                  groupName: "Long group name, let's check it",
                  isLeader: false,
                  createdAt: faker.date.recent(30).toISOString(),
                },
                { groupName: 'Storage', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
                { groupName: 'First', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
                { groupName: 'More', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
                { groupName: 'Extra', isLeader: true, createdAt: faker.date.recent(30).toISOString() },
              ]}
            />
          </Row>
        </Column>
      </ModalBlock>
    </TemplateBlock>
  </HashRouter>
)

export const Default = Template.bind({})
