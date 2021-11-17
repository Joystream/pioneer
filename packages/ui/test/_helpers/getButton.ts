import { screen } from '@testing-library/react'

export async function getButton(text: string | RegExp) {
  return (await screen.findByText(text, { selector: 'span' })).parentElement!
}
export async function queryButton(text: string | RegExp) {
  return (await screen.queryByText(text, { selector: 'span' }))?.parentElement
}
