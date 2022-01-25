import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SelectedMember, SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props {
  addSlashed: (worker: Member) => void
  removeLastSlashed: () => void
  filter: (member: Member) => boolean
  slashed: Member[]
}

export const SlashedSelection = ({ addSlashed, removeLastSlashed, slashed, filter }: Props) => {
  return (
    <>
      {slashed.map((loser) => (
        <SelectedMember member={loser} label="Member ID" disabled tooltipText="Lorem ipsum" />
      ))}
      <RowGapBlock gap={15}>
        <InputComponent label="New worker to slash" tooltipText="Lorem ipsum" inputSize="l">
          <SelectMember filter={filter} onChange={addSlashed} />
        </InputComponent>
        {!!slashed.length && (
          <ButtonGhost size="small" onClick={removeLastSlashed}>
            Remove last slashed worker
          </ButtonGhost>
        )}
      </RowGapBlock>
    </>
  )
}
