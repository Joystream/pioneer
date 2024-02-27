import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { waitForOptions as WaitForOptions } from '@testing-library/dom/types'
import * as queries from '@testing-library/dom/types/queries'
import { BoundFunctions, SelectorMatcherOptions } from '@testing-library/react'
import { merge } from 'lodash'

export type Container = BoundFunctions<typeof queries>

export const withinModal = (canvasElement: HTMLElement): Container =>
  within(canvasElement.querySelector('#modal-container') as HTMLElement)

const mergeMatcherOptions = (
  a: SelectorMatcherOptions | undefined,
  b: SelectorMatcherOptions
): SelectorMatcherOptions => {
  if (!a) return b
  else if (!a.selector || !b.selector) return merge({}, a, b)
  else return merge({}, a, b, { selector: `:is(${a.selector}):is(${b.selector})` })
}

export const getButtonByText = (container: Container, text: string | RegExp, options?: SelectorMatcherOptions) =>
  container.getByText(text, mergeMatcherOptions(options, { selector: 'span' })).parentElement as HTMLElement

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

export const selectFromDropdown = async (container: Container, label: string | RegExp | HTMLElement, name: string) => {
  const labelElement = label instanceof HTMLElement ? label : container.getByText(label)
  const toggle = labelElement.parentElement?.querySelector('.ui-toggle')
  if (!toggle) throw `Found a label: ${label.toString()}, however no dropdown is associated with this label.`

  await userEvent.click(toggle)

  const optionsWrapper = await waitFor(() => {
    const optionsWrapper = document.getElementById('select-popper-wrapper')
    expect(optionsWrapper).not.toBeNull()
    return optionsWrapper as HTMLElement
  }, {})

  await userEvent.click(within(optionsWrapper).getByText(name))
}
