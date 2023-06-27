import { waitFor, within } from '@storybook/testing-library'
import { waitForOptions as WaitForOptions } from '@testing-library/dom/types'
import * as queries from '@testing-library/dom/types/queries'
import { BoundFunctions } from '@testing-library/react'

export type Container = BoundFunctions<typeof queries>

export const withinModal = (canvasElement: HTMLElement): Container =>
  within(canvasElement.querySelector('#modal-container') as HTMLElement)

export const getButtonByText = (container: Container, text: string | RegExp) =>
  container.getByText(text, { selector: 'span' }).parentElement as HTMLElement

export const getEditorByLabel = async (
  container: Container,
  text: string | RegExp,
  waitForOptions?: WaitForOptions
) => {
  const errMsg = (msg: string) => `Found a label with the text of: ${text}, however ${msg}`

  const label = container.getByText(text, { selector: 'label[for]' })
  const id = label.getAttribute('for')
  if (!id) throw errMsg('this label for attribute is empty.')

  const editor = document.getElementById(id)
  if (!editor) throw errMsg('no element is associated with this label.')
  await waitFor(() => {
    if (!('setData' in editor)) throw 'Wait for the editor to be ready'
  }, waitForOptions)

  return editor as HTMLElement & { setData: (data: string) => void }
}
