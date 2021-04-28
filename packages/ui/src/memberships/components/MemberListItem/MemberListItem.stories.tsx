import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MyMemberListItem, MemberListItem } from '.'

export default {
  title: 'Member/MemberListItem',
  subcomponents: { MyMemberListItem, MemberListItem },
} as Meta

type MyMemberStory = Story<Parameters<typeof MyMemberListItem>[0]>
export const MyMember: MyMemberStory = (props) => <MyMemberListItem {...props} />
MyMember.args = {
  member: {
    id: '144',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: false,
    isFoundingMember: false,
    roles: [],
    inviteCount: 0,
  },
}

type MemberStory = Story<Parameters<typeof MemberListItem>[0]>
export const Member: MemberStory = (props) => <MemberListItem {...props} />
Member.args = {
  member: {
    id: '144',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: false,
    isFoundingMember: false,
    roles: [],
    inviteCount: 0,
  },
}
