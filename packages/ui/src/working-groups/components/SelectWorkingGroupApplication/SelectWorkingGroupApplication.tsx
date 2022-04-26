import React, { useMemo } from 'react'
import styled from 'styled-components'

import { OptionComponent, Select, SelectedOption } from '@/common/components/selects'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { OptionWorkingGroupTitle } from '@/working-groups/components/SelectWorkingGroup/OptionWorkingGroup'
import { OptionsListWorkingGroupApplication } from '@/working-groups/components/SelectWorkingGroupApplication/OptionsListWorkingGroupApplication'
import { OptionWorkingGroupApplication } from '@/working-groups/components/SelectWorkingGroupApplication/OptionWorkingGroupApplication'
import { ApplicationStatus, useApplications } from '@/working-groups/hooks/useApplications'
import { WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

interface Props {
  onChange: (selected: WorkingGroupApplication) => void
  selectedApplicationId?: string
  placeholder: string
  applicationsStatus?: ApplicationStatus
  disabled?: boolean
  className?: string
  id?: string
  openingId?: string
}

const SelectWorkingGroupApplicationBase = ({
  id,
  onChange,
  selectedApplicationId,
  placeholder,
  disabled,
  className,
  openingId,
  applicationsStatus,
}: Props) => {
  const { applications } = useApplications({ applicationsStatus, openingId })
  const selectedApplication = useMemo(
    () => applications?.find((application) => application.id === selectedApplicationId),
    [selectedApplicationId, applications?.length]
  )

  const change = (selected: WorkingGroupApplication, close: () => void) => {
    onChange(selected)
    close()
  }
  return (
    <Select
      id={id}
      selected={selectedApplication}
      onChange={change}
      disabled={disabled}
      renderSelected={renderSelected}
      placeholder={placeholder}
      renderList={(onOptionClick) => (
        <OptionsListWorkingGroupApplication allWorkingGroupApplications={applications} onChange={onOptionClick} />
      )}
      onSearch={() => undefined}
      className={className}
    />
  )
}

const renderSelected = (application: WorkingGroupApplication) => (
  <SelectedOption>
    <OptionWorkingGroupApplication application={application} />
  </SelectedOption>
)

export const SelectWorkingGroupApplication = styled(SelectWorkingGroupApplicationBase)`
  ${SelectedOption} {
    grid-template-columns: 1fr;
  }
  ${OptionComponent} {
    grid-template-columns: 1fr;
    padding: 10px 16px;

    &:hover,
    &:focus,
    &:focus-within {
      ${OptionWorkingGroupTitle} {
        color: ${Colors.Blue[500]};
      }
    }
    &:active {
      ${OptionWorkingGroupTitle} {
        color: ${Colors.Blue[600]};
      }
    }
    &:disabled {
      cursor: not-allowed;
      background-color: ${Colors.Black[50]};
      z-index: 0;

      ${OptionWorkingGroupTitle} {
        color: ${Colors.Black[500]};
      }
      ${TextMedium} {
        color: ${Colors.Black[400]};
      }
    }
  }
`
