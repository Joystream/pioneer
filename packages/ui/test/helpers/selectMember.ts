import { expect } from '@jest/globals'
import { Matcher } from '@testing-library/dom/types/matches'
import { fireEvent } from '@testing-library/react'

export const selectMember = async (
  label: string,
  name: string,
  findByText: (text: Matcher) => Promise<HTMLElement>
) => {
  const labelElement = await findByText(/^to$/i)
  const parentNode = labelElement.parentElement
  const button = parentNode?.querySelector('div > button')

  expect(button).toBeDefined()
  button && fireEvent.click(button)

  const memberTitles = parentNode?.querySelectorAll('ul > li')
  const found = memberTitles && Array.from(memberTitles).find((li) => li.textContent?.match(name))

  expect(found).toBeDefined()
  found && fireEvent.click(found)
}
