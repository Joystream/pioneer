import { render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { TileSection } from '@/bounty/components/TileSection'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'
import members from '@/mocks/data/raw/members.json'

const alice = members[0]

describe('TileSection', () => {
  const firstRow = [
    {
      title: 'Stage',
      content: (
        <TextHuge value bold>
          Expired
        </TextHuge>
      ),
      tooltipText: 'tooltip',
    },
    {
      title: 'Period type',
      content: (
        <TextHuge value bold>
          Limited
        </TextHuge>
      ),
    },
    {
      title: 'Creator',
      content: <MemberInfo member={alice as unknown as Member} size="m" memberSize="m" hideGroup />,
    },
    {
      title: 'Oracle',
      content: <MemberInfo member={alice as unknown as Member} size="m" memberSize="m" hideGroup />,
    },
  ]

  const secondRow = [
    {
      title: 'Funded',
      content: <TokenValue value={new BN(9999)} size="l" />,
    },
    {
      title: 'Cherry',
      content: <TokenValue value={new BN(9999)} size="l" />,
    },
    {
      title: 'Works',
      content: (
        <TextHuge value bold>
          8
        </TextHuge>
      ),
    },
  ]

  beforeEach(() => {
    render(<TileSection secondRow={secondRow} firstRow={firstRow} />)
  })

  it('Renders first row', async () => {
    firstRow.map((tile) => {
      const title = screen.getByText(tile.title)
      expect(title).toBeDefined()

      const content = title.parentElement?.parentElement?.children.item(1)
      expect(content?.textContent).toBeDefined()
    })
  })

  it('Renders second row', async () => {
    firstRow.map((tile) => {
      const title = screen.getByText(tile.title)
      expect(title).toBeDefined()

      const content = title.parentElement?.parentElement?.children.item(1)
      expect(content?.textContent).toBeDefined()
    })
  })
})
