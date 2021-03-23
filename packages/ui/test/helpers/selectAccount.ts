import { expect } from '@jest/globals'
import { fireEvent, screen, within } from '@testing-library/react'

export async function selectAccount(label: string, name: string) {
  const labelElement = await screen.findByText(new RegExp(`^${label}$`, 'i'))
  const parentElement = labelElement.parentElement

  if (!parentElement) {
    return
  }

  const toggle = await within(parentElement).findByRole('button')
  toggle && fireEvent.click(toggle)

  const accountTitles = parentElement?.querySelectorAll('ul > li')
  const found = accountTitles && Array.from(accountTitles).find((li) => li.textContent?.match(name))

  expect(found).toBeDefined()
  found && fireEvent.click(found)
}
