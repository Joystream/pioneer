import { act, fireEvent, screen } from '@testing-library/react'

export const toggleCheckBox = async (check: boolean, index?: number) => {
  const checkbox = index
    ? (await screen.findAllByRole<HTMLInputElement>('checkbox'))[index]
    : await screen.findByRole<HTMLInputElement>('checkbox')
  toggleFromCheckBoxElement(checkbox, check)
}

export const toggleFromCheckBoxElement = (element: HTMLInputElement, check: boolean) => {
  if ((check && !element.checked) || (!check && element.checked))
    act(() => {
      fireEvent.click(element)
    })
}
