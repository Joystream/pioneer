import { render } from '@testing-library/react'
import React from 'react'

import { MarkdownPreview } from '@/common/components/MarkdownPreview'

const EDITOR_OUTPUT = `## Heading 1

### Heading 2

#### Heading 3

*   ui 1
    *   ul 1.1
        *   ul 1.1.1
    *   ul 1.2
*   ul 2

1.  ol 1
2.  ol 2

> A quote`

describe.skip('UI: MarkdownPreview', () => {
  it('Empty', async () => {
    const { container } = renderComponent('')

    expect(container.innerHTML).toBe('')
  })

  it('Single paragraph', async () => {
    const { container } = renderComponent('Foo bar baz')

    expect(container.innerHTML).toBe('<p>Foo bar baz</p>')
  })

  it('Example editor output', async () => {
    const { container } = renderComponent(EDITOR_OUTPUT)

    expect(container.innerHTML).toMatchSnapshot()
  })

  function renderComponent(markdown: string) {
    return render(<MarkdownPreview markdown={markdown} />)
  }
})
