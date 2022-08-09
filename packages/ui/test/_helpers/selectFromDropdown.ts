import { fireEvent, screen, waitFor } from '@testing-library/react'

export const selectFromDropdown = async (label: string, name: string) => {
  const labelElement = await screen.findByText(new RegExp(`${label}`, 'i'))
  await selectFromDropdownElement(labelElement, name)
}

export const selectFromDropdownWithId = async (id: string, name: string) => {
  const labelElement = await screen.findByTestId(id)
  await selectFromDropdownElement(labelElement, name)
}

const selectFromDropdownElement = async (element: HTMLElement, name: string) => {
  const parentElement = element.parentElement

  if (!parentElement) {
    return
  }

  const toggle = parentElement.querySelector('.ui-toggle')
  toggle && fireEvent.click(toggle)

  let found
  await waitFor(() => {
    const optionsWrapper = document.getElementById('select-popper-wrapper')
    const memberTitles = optionsWrapper?.querySelectorAll('ul > li')
    found = memberTitles && Array.from(memberTitles).find((li) => li.textContent?.match(name))
    expect(found).toBeDefined()
  }, {})

  found && fireEvent.click(found)
}
