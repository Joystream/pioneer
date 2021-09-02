import { render } from '@testing-library/react'
import React from 'react'

import { HighlightedText } from '@/common/components/Search/HighlightedText'

const TEXT =
  'The council has a fixed number of seats NUMBER_OF_COUNCIL_SEATS occupied by members, called councilors. The seats are always occupied, allowing the platform to dispose of all proposals they may come in at any time. The council body has two high level states described as follows.'

describe('UI: HighlightedText', () => {
  it('No pattern', async () => {
    const { container } = render(<HighlightedText>{TEXT}</HighlightedText>)

    expect(container.innerHTML).toBe(TEXT)
  })

  it('Pattern', async () => {
    const pattern = /council/gi
    const { container } = render(<HighlightedText pattern={pattern}>{TEXT}</HighlightedText>)

    const highlighted = Array.from(container.children)

    expect(container.textContent).toBe(TEXT)
    expect(highlighted).toHaveLength(4)
    highlighted.forEach((element) => {
      expect(element.tagName).toBe('SPAN')
      expect(element.innerHTML).toMatch(/^council$/i)
    })
  })

  it('Shorten', async () => {
    const pattern = /council/gi
    const { container } = render(
      <HighlightedText pattern={pattern} shorten>
        {TEXT}
      </HighlightedText>
    )

    expect(container.textContent).toBe(
      'The council has a fixed number of seats NUMBER_OF_COUNCIL_SEATS occupied by members, called councilors. ... The council body has ...'
    )
  })
})
