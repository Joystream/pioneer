import React from 'react'

import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import {
  ApplicationForm,
  WorkingGroupAndDescription,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'
import { CreateOpeningButtonProps } from '@/working-groups/components/CreateOpeningButton'

export const CreateOpeningForm = ({ group }: CreateOpeningButtonProps) => {
  return (
    <>
      <WorkingGroupAndDescription noHeader groupId={group} />

      <InputComponent id="target" label="Hiring target" inputSize="s" name="target">
        <InputText id="hiring-target" name="target" />
      </InputComponent>

      <ApplicationForm noHeader />
    </>
  )
}
