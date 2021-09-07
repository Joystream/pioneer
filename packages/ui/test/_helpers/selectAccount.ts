import { fireEvent, screen, waitFor } from '@testing-library/react'

export async function selectAccount(label: string, name: string) {
  const labelElement = await screen.findByText(new RegExp(`^${label}$`, 'i'))
  const parentElement = labelElement.parentElement

  if (!parentElement) {
    return
  }

  const toggle = parentElement.querySelector('.ui-toggle')
  toggle && fireEvent.click(toggle)

  let found: any
  await waitFor(() => {
    const accountTitles = parentElement.querySelectorAll('ul > li')
    found = accountTitles && Array.from(accountTitles).find((li) => li.textContent?.match(name))

    expect(found).toBeDefined()
  })
  found && fireEvent.click(found)
}
