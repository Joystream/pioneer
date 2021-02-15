import { Matcher } from '@testing-library/dom/types/matches'
import { fireEvent } from '@testing-library/react'
import { expect } from 'chai'

export function selectAccount(label: string, name: string, getByText: (text: Matcher) => HTMLElement) {
  const labelElement = getByText(new RegExp(`${label}`, 'i'))
  const parentNode = labelElement.parentNode
  const button = parentNode?.querySelector('div > button')

  expect(button).to.exist
  button && fireEvent.click(button)

  const accountTitles = parentNode?.querySelectorAll('ul > li')
  const found = accountTitles && Array.from(accountTitles).find((li) => li.textContent?.match(name))

  expect(found).to.exist
  found && fireEvent.click(found)
}
