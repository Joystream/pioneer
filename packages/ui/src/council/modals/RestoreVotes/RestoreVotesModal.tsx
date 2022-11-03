import React, { useCallback, useReducer } from 'react'
import * as Yup from 'yup'

import { ButtonPrimary } from '@/common/components/buttons'
import { FileEntry, FileInput } from '@/common/components/forms/FileInput'
import { Modal, ModalBody, ModalHeader, ModalFooter } from '@/common/components/Modal'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useModal } from '@/common/hooks/useModal'
import { dedupeObjects } from '@/common/utils'
import { VotesBackup } from '@/council/components/election/BackupVotesButton'
import { VotingAttempt } from '@/council/hooks/useCommitment'

import { RestoreVotesModalCall } from './types'

const VotingAttemptsSchema = Yup.array().of(
  Yup.object().shape({
    salt: Yup.string()
      .matches(/^0x[a-f0-9]{64}$/)
      .required(),
    accountId: Yup.string().matches(/^\w+$/).required(),
    optionId: Yup.string().matches(/^\d+$/).required(),
  })
)
const VotesBackupSchema = Yup.object().shape({
  cycleId: Yup.number().required(),
  votingAttempts: VotingAttemptsSchema.min(1).required(),
})

const parseContent = (contentJson: string, cycleId: number): Pick<Value, 'errors' | 'content'> => {
  try {
    const content = JSON.parse(contentJson)
    VotesBackupSchema.validateSync(content)
    if (content.cycleId !== cycleId) {
      throw new Yup.ValidationError('This file refers to the wrong election')
    }
    return { content: content as VotesBackup, errors: [] }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { errors: [new Yup.ValidationError(error.message)] }
    } else if (error instanceof Yup.ValidationError) {
      return { errors: [error] }
    } else throw error
  }
}

type Value = FileEntry & { content?: VotesBackup }
type Action = { type: 'set-file'; value: File } | { type: 'set-content'; value: string }

const valueReducer =
  (cycleId: number) =>
  (value: undefined | Value, action: Action): undefined | Value => {
    switch (action.type) {
      case 'set-file':
        return { file: action.value }

      case 'set-content':
        if (value) {
          return { file: value.file, ...parseContent(action.value, cycleId) }
        }
    }
  }

export const RestoreVotesModal = () => {
  const {
    hideModal,
    modalData: { cycleId },
  } = useModal<RestoreVotesModalCall>()
  const [votingAttempts, setVotingAttempts] = useLocalStorage<VotingAttempt[]>(`votes:${cycleId}`)
  const [value, dispatch] = useReducer(valueReducer(cycleId), undefined)

  const onUpload = useCallback(async ([file]: File[]) => {
    if (!file) return
    dispatch({ type: 'set-file', value: file })
    const contentJson = await file.text()
    dispatch({ type: 'set-content', value: contentJson })
  }, [])

  const onConfirm = useCallback(() => {
    if (!value?.content || value?.errors?.length !== 0) return
    const { content } = value

    try {
      VotingAttemptsSchema.validateSync(votingAttempts)
      setVotingAttempts(dedupeObjects([...(votingAttempts ?? []), ...content.votingAttempts]))
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setVotingAttempts(content.votingAttempts)
      } else throw error
    }

    hideModal()
  }, [value, votingAttempts, setVotingAttempts])

  return (
    <Modal modalSize="s" modalHeight="s" onClose={hideModal}>
      <ModalHeader title="Restore Votes" onClick={hideModal} />

      <ModalBody>
        <p>
          In case of browser storage loss or when switching devices, restoring your votes from a backup file may be
          necessary to reveal them. Upload your votes backup file to the browser storage here.
        </p>

        <FileInput
          title="Drag and drop file here to restore"
          accept="application/json"
          value={value ? [value] : []}
          onChange={onUpload}
        />
      </ModalBody>

      <ModalFooter>
        <ButtonPrimary size="medium" disabled={value?.errors?.length !== 0} onClick={onConfirm}>
          Restore Votes
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
