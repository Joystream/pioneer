import React from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { Colors } from '@/common/constants'

import { Validator } from '../types'

import { ValidatorItem } from './ValidatorItem'

interface ValidatorsListProps {
  validators: Validator[]
}

export const ValidatorsList = ({ validators }: ValidatorsListProps) => {
  return (
    <ValidatorsListWrap>
      <ListHeaders>
        <ListHeader>Validator</ListHeader>
        <ListHeader>Verification</ListHeader>
        <ListHeader>State</ListHeader>
        <ListHeader>Total Reward</ListHeader>
        <ListHeader>APR</ListHeader>
      </ListHeaders>
      <List>
        {validators?.map((validator) => (
          <ListItem key={validator.address}>
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

  ${List} {
    gap: 8px;
  }
  ${ListItem} {
    background: ${Colors.Black[50]};
  }
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: validatorstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 250px 80px 80px 120px 80px 120px;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 8px;
`

const ListHeader = styled.span`
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
