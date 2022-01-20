import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { BountyWorkListItem, BountyWorkListItemProps } from '@/bounty/components/BountyWorkListItem/BountyWorkListItem'
import { Member } from '@/memberships/types'
import members from '@/mocks/data/raw/members.json'
import { randomBlock } from '@/mocks/helpers/randomBlock'

const randomizedBlock = randomBlock()

describe('UI: BountyWorkListItem', () => {
  const props: BountyWorkListItemProps = {
    id: 'asd',
    entrant: members[0] as unknown as Member,
    description: 'Description',
    withdrawn: false,
    title: 'Title',
    inBlock: randomizedBlock,
    link: 'url',
  }

  it('Renders props', async () => {
    renderItem()

    expect(await screen.queryByText(props.title)).toBeDefined()
    expect(await screen.queryByText(props.description)).toBeDefined()
    expect(await screen.queryByText(props.entrant.handle)).toBeDefined()
    expect(await screen.queryByText(props.inBlock.network)).toBeDefined()
    expect(await screen.queryByText(props.inBlock.number)).toBeDefined()
  })

  it('Renders withdrawn', async () => {
    props.withdrawn = true

    renderItem()

    expect(await screen.queryByText(props.entrant.handle)).toBeDefined()
    expect(await screen.queryByText(props.inBlock.network)).toBeDefined()
    expect(await screen.queryByText(props.inBlock.number)).toBeDefined()
    expect(await screen.queryByText(props.title)).toBeNull()
    expect(await screen.queryByText(props.description)).toBeNull()
  })

  const renderItem = () => {
    render(
      <MemoryRouter>
        <BountyWorkListItem {...props} />
      </MemoryRouter>
    )
  }
})
