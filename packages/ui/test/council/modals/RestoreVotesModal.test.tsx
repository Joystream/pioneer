import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { ModalContextProvider } from '@/common/providers/modal/provider'
import { VotesBackup } from '@/council/components/election/BackupVotesButton'
import { VotingAttempt } from '@/council/hooks/useCommitment'
import { RestoreVotesModal } from '@/council/modals/RestoreVotes'

import { expectToBeDefined } from '../../_helpers/expectToBeDefined'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { mockUseModalCall } from '../../setup'

const cycleId = 1
const key = `votes:${cycleId}`

const salts = [
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000000000000000000000000000001',
  '0x0000000000000000000000000000000000000000000000000000000000000002',
]
const attempts: VotingAttempt[] = salts.map((salt) => ({
  salt,
  accountId: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  optionId: '0',
}))
const validBackup: VotesBackup = { cycleId, votingAttempts: [attempts[0], attempts[1]] }

describe('UI: Restore Votes Modal', () => {
  beforeAll(() => {
    mockUseModalCall({ modalData: { cycleId } })
  })

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('Display the modal', async () => {
    displayModal()
    expect(await screen.findByRole('heading', { name: 'Restore Votes' })).toBeDefined()
    expect(await screen.findByText('Drag and drop file here to restore')).toBeDefined()
    expect(await screen.findByRole('button', { name: 'Restore Votes' })).toBeDisabled()
    expect(window.localStorage.getItem(key)).toBe(null)
  })

  describe('Valid files', () => {
    const file = createFile(JSON.stringify(validBackup))

    it('From empty local storage', async () => {
      displayModal()
      await uploadFile(file)
      await clickConfirm()
      expect(window.localStorage.getItem(key)).toBe(JSON.stringify([attempts[0], attempts[1]]))
    })

    it('From corrupted local storage', async () => {
      window.localStorage.setItem(key, JSON.stringify({ a: 1 }))
      displayModal()
      await uploadFile(file)
      await clickConfirm()
      expect(window.localStorage.getItem(key)).toBe(JSON.stringify([attempts[0], attempts[1]]))
    })

    it('Deduplicate items', async () => {
      window.localStorage.setItem(key, JSON.stringify([attempts[1], attempts[2]]))
      displayModal()
      await uploadFile(file)
      await clickConfirm()
      expect(window.localStorage.getItem(key)).toBe(JSON.stringify([attempts[1], attempts[2], attempts[0]]))
    })
  })

  describe('Invalid files', () => {
    it('Not a valid JSON', async () => {
      displayModal()
      await uploadFile(createFile('not json'))
      expect(await screen.findByRole('button', { name: 'Restore Votes' })).toBeDisabled()
      expect(await screen.findByText(/^Unexpected token/)).toBeDefined()
    })

    it('Invalid schema', async () => {
      displayModal()
      await uploadFile(createFile(JSON.stringify({ cycleId, votingAttempts: [{ ...attempts[0], salt: null }] })))
      expect(await screen.findByRole('button', { name: 'Restore Votes' })).toBeDisabled()
      expect(await screen.findByText(/^votingAttempts\[0\].salt must be a `string`/)).toBeDefined()
    })

    it('Wrong election', async () => {
      displayModal()
      await uploadFile(createFile(JSON.stringify({ ...validBackup, cycleId: 2 })))
      expect(await screen.findByRole('button', { name: 'Restore Votes' })).toBeDisabled()
      expect(await screen.findByText('This file refers to the wrong election')).toBeDefined()
    })
  })

  const displayModal = () =>
    render(
      <MockQueryNodeProviders>
        <ModalContextProvider>
          <RestoreVotesModal />
        </ModalContextProvider>
      </MockQueryNodeProviders>
    )
})

function createFile(content: string) {
  const file = new File([content], 'file.json')
  file.text = jest.fn(() => Promise.resolve(content))
  return file
}

async function uploadFile(file: File) {
  const input = (await screen.findByText(/^Browse for file/)).lastElementChild
  if (expectToBeDefined(input)) {
    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } })
      await waitFor(() => expect(file.text).toBeCalled)
    })
  }
}

async function clickConfirm() {
  const confirmButton = await screen.findByRole('button', { name: 'Restore Votes' })
  expect(confirmButton).not.toBeDisabled()
  act(() => {
    fireEvent.click(confirmButton)
  })
}
