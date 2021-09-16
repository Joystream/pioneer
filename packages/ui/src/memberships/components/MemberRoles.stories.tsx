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
                { id: '0', groupName: 'Big group', isLead: false, createdAt: faker.date.recent(30).toISOString() },
                { id: '1', groupName: 'Forum', isLead: true, createdAt: faker.date.recent(30).toISOString() },
                {
                  id: '2',
                  groupName: "Long group name, let's check it",
                  isLead: false,
                  createdAt: faker.date.recent(30).toISOString(),
                },
                { id: '3', groupName: 'Storage', isLead: true, createdAt: faker.date.recent(30).toISOString() },
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
                { id: '0', groupName: 'Big group', isLead: false, createdAt: faker.date.recent(30).toISOString() },
                { id: '1', groupName: 'Forum', isLead: true, createdAt: faker.date.recent(30).toISOString() },
                {
                  id: '2',
                  groupName: "Long group name, let's check it",
                  isLead: false,
                  createdAt: faker.date.recent(30).toISOString(),
                },
                { id: '3', groupName: 'Storage', isLead: true, createdAt: faker.date.recent(30).toISOString() },
                { id: '4', groupName: 'More', isLead: true, createdAt: faker.date.recent(30).toISOString() },
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
                { id: '0', groupName: 'Big group', isLead: false, createdAt: faker.date.recent(30).toISOString() },
                { id: '1', groupName: 'Forum', isLead: true, createdAt: faker.date.recent(30).toISOString() },
                {
                  id: '2',
                  groupName: "Long group name, let's check it",
                  isLead: false,
                  createdAt: faker.date.recent(30).toISOString(),
                },
                { id: '3', groupName: 'Storage', isLead: true, createdAt: faker.date.recent(30).toISOString() },
                { id: '4', groupName: 'First', isLead: true, createdAt: faker.date.recent(30).toISOString() },
                { id: '5', groupName: 'More', isLead: true, createdAt: faker.date.recent(30).toISOString() },
                { id: '6', groupName: 'Extra', isLead: true, createdAt: faker.date.recent(30).toISOString() },
              ]}
            />
          </Row>
        </Column>
      </ModalBlock>
    </TemplateBlock>
  </HashRouter>
)

export const Default = Template.bind({})
