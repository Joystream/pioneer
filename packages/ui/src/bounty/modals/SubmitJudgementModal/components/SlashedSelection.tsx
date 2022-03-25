import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

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
  validIds: string[]
}

export const SlashedSelection = ({ addSlashed, removeLastSlashed, slashed, filter, editSlashed, validIds }: Props) => {
  const { t } = useTranslation('bounty')
  const onSlashedEdit = useCallback(
    (id: number) => (member: Member) => {
      editSlashed(id, member)
    },
    [editSlashed]
  )

  return (
    <>
      {slashed.map((loser, index) => (
        <InputComponent
          key={`slashed${index}`}
          id={`slashedInput${index + 1}`}
          label={t('modals.submitJudgement.slash.worker.label', { number: index + 1 })}
          tooltipText={t('modals.submitJudgement.slash.worker.tooltip')}
          inputSize="l"
        >
          <SelectMember
            id={`slashedInput${index + 1}`}
            filter={filter}
            selected={loser.rejected}
            onChange={onSlashedEdit(loser.id)}
            validIds={validIds}
          />
        </InputComponent>
      ))}
      <ColumnGapBlock gap={15}>
        <ButtonPrimary size="small" onClick={addSlashed}>
          {t('modals.submitJudgement.slash.worker.addSlashed')}
        </ButtonPrimary>
        {!!slashed.length && (
          <ButtonGhost size="small" onClick={removeLastSlashed}>
            {t('modals.submitJudgement.slash.worker.removeSlashed')}
          </ButtonGhost>
        )}
      </ColumnGapBlock>
    </>
  )
}
