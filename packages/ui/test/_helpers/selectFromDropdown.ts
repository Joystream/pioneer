import { fireEvent, screen, waitFor } from '@testing-library/react'

export const selectFromDropdown = async (label: string, name: string) => {
  const labelElement = await screen.findByText(new RegExp(`${label}`, 'i'))
  const parentElement = labelElement.parentElement

  if (!parentElement) {
    return
  }

  const toggle = parentElement.querySelector('.ui-toggle')
  toggle && fireEvent.click(toggle)

  let found: any
  await waitFor(() => {
    const memberTitles = parentElement?.querySelectorAll('ul > li')
    found = memberTitles && Array.from(memberTitles).find((li) => li.textContent?.match(name))
    expect(found).toBeDefined()
  })

  found && fireEvent.click(found)
}
