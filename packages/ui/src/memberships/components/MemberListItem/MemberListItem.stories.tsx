import { Meta } from '@storybook/react'

import { MemberListItem } from '.'
import MyMemberListItem from './MyMemberListItem.stories'

export default {
  title: 'Member/MemberListItem',
  component: MemberListItem,
  args: MyMemberListItem.args,
} as Meta

export const Default = {}
