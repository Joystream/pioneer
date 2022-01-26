import React, { useCallback } from 'react'

import { BountyRejected } from '@/bounty/modals/SubmitJudgementModal/machine'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props {
  addSlashed: () => void
  removeLastSlashed: () => void
  filter: (member: Member) => boolean
  slashed: BountyRejected[]
  editSlashed: (id: number, rejected: Member) => void
}

export const SlashedSelection = ({ addSlashed, removeLastSlashed, slashed, filter, editSlashed }: Props) => {
  const onSlashedEdit = useCallback(
    (id: number) => (member: Member) => {
      editSlashed(id, member)
    },
    [editSlashed]
  )

  return (
    <>
      {slashed.map((loser) => (
        <InputComponent label="Member ID" tooltipText="Lorem ipsum" inputSize="l">
          <SelectMember filter={filter} selected={loser.rejected} onChange={onSlashedEdit(loser.id)} />
        </InputComponent>
      ))}
      <ColumnGapBlock gap={15}>
        <ButtonPrimary size="small" onClick={addSlashed}>
          Add Slashed
        </ButtonPrimary>
        {!!slashed.length && (
          <ButtonGhost size="small" onClick={removeLastSlashed}>
            Remove last slashed worker
          </ButtonGhost>
        )}
      </ColumnGapBlock>
    </>
  )
}
