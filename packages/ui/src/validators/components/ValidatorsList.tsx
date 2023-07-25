import React, { useMemo } from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { Colors } from '@/common/constants'

import { Validator } from '../types'

import { ValidatorItem } from './ValidatorItem'

interface ValidatorsListProps {
  validators: Validator[]
}

export const ValidatorsList = ({ validators }: ValidatorsListProps) => {
  const sortedValidators = useMemo(() => validators, [validators])

  return (
    <ValidatorsListWrap>
      <ListHeaders>
        <ListHeader>Validator</ListHeader>
        <ListHeader>Verification</ListHeader>
        <ListHeader>State</ListHeader>
        <ListHeader>Total Reward</ListHeader>
        <ListHeader>APR</ListHeader>
        <ListHeader>Started On</ListHeader>
      </ListHeaders>
      <List>
        {sortedValidators?.map((validator) => (
          <ListItem key={validator.address} borderless>
            <ValidatorItem validator={validator} />
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
    'validatorstablenav'
    'validatorslist';
  grid-row-gap: 4px;
  width: 100%;
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: validatorstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 200px repeat(2, 80px) 120px 50px 80px 100px;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 8px;
`

export const ListHeader = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-self: end;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;
  user-select: none;
  cursor: pointer;

  &:first-child {
    text-align: left;
    justify-self: start;
  }
`
