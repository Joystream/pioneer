import { screen, fireEvent, waitFor } from '@testing-library/react'

export const selectMember = async (label: string, name: string) => {
  const labelElement = await screen.findByText(new RegExp(`${label}`, 'i'))
  const parentElement = labelElement.parentElement

  if (!parentElement) {
    return
  }

  const toggle = parentElement.querySelector('.ui-toggle')

  if (!toggle) {
    return
  }

  fireEvent.click(toggle)

  let found: any

  await waitFor(() => {
    const memberTitles = parentElement?.querySelectorAll('ul > li')
    const elements = Array.from(memberTitles)

    found = memberTitles && elements.find((li) => li.textContent?.match(name))

    expect(found).toBeDefined()
  })

  if (!found) {
    return
  }

  fireEvent.click(found)
}
