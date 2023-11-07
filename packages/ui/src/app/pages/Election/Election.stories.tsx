import { Meta, StoryContext, StoryObj } from '@storybook/react'
import { FC } from 'react'
import BN from 'bn.js'

type Args = {
  electionStage: string
  value?: number | BN
  currentBlock?: number | BN
}
  
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Election/Election',


}


export const Default: Story = {}