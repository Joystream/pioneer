import { fireEvent, screen } from '@testing-library/react'

export async function selectAccount(label: string, name: string) {
  const labelElement = await screen.findByText(new RegExp(`^${label}$`, 'i'))
  const parentElement = labelElement.parentElement

  if (!parentElement) {
    return
  }

  const toggle = parentElement.querySelector('.ui-toggle')
  toggle && fireEvent.click(toggle)

  const accountTitles = parentElement?.querySelectorAll('ul > li')
  const found = accountTitles && Array.from(accountTitles).find((li) => li.textContent?.match(name))

  expect(found).toBeDefined()
  found && fireEvent.click(found)
}
