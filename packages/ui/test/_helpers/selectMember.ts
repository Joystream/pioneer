import { screen, fireEvent } from '@testing-library/react'

export const selectMember = async (label: string, name: string) => {
  const labelElement = await screen.findByText(new RegExp(`${label}`, 'i'))
  const parentElement = labelElement.parentElement

  expect(parentElement).toBeDefined()
  if (!parentElement) {
    return
  }

  const toggle = parentElement.querySelector('.ui-toggle')
  expect(toggle).toBeDefined()

  if (!toggle) {
    return
  }

  await fireEvent.click(toggle)

  const memberTitles = parentElement?.querySelectorAll('ul > li')
  const found = memberTitles && Array.from(memberTitles).find((li) => li.textContent?.match(name))

  expect(found).toBeDefined()

  if (!found) {
    return
  }

  await fireEvent.click(found)
}
