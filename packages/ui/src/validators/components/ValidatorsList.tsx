import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ListHeaders,ListHeader} from '@/common/components/List/ListHeader'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { useModal } from '@/common/hooks/useModal'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { ValidatorItem } from './ValidatorItem'
import { useValidatorsList } from '../hooks/useValidatorsList'

export const ValidatorsList = () => {
  const { visibleValidators } = useValidatorsList()
  const [isDisplayAll, setIsDisplayAll] = useState(true)
  const [isDescending, setDescending] = useState(false)
  const sortedValidators = useMemo(
    () => visibleValidators,
    [visibleValidators]
  )

  return (
    <ValidatorsListWrap>
      <ListHeaders>
        <ListHeader >Validator</ListHeader>
        <ListHeader >Verification</ListHeader>
        <ListHeader >State</ListHeader>
        <ListHeader >Total Reward</ListHeader>
        <ListHeader >Health</ListHeader>
        <ListHeader >APR</ListHeader>
        <ListHeader >Started On</ListHeader>
      </ListHeaders>
      <List>
          {sortedValidators?.map((validator) => (
            <ListItem key={validator.toString()} borderless>
              <ValidatorItem validator={validator.toString()} />
            </ListItem>
          ))}
      </List>
    </ValidatorsListWrap>
  )
}

const ValidatorsListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'accountstablenav'
    'accountslist';
  grid-row-gap: 4px;
  width: 100%;
`
