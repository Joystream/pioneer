import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { CheckboxIcon } from '@/common/components/icons'
import { List, ListItem } from '@/common/components/List'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { proposalDescriptions } from '@/proposals/model/proposalDescriptions'
import { enabledProposals } from '@/proposals/model/proposalDetails'
import { ProposalType } from '@/proposals/types'

export const ProposalTypeStep = () => {
  const { setValue, watch } = useFormContext()
  const chosenType = watch('proposalType.type')

  function selectType(type: ProposalType) {
    if (enabledProposals.includes(type)) {
      setValue('proposalType.type', type, { shouldValidate: true })
    }
  }

  return (
    <RowGapBlock gap={24}>
      <RowGapBlock gap={8}>
        <h4>Proposal type</h4>
        <TextMedium lighter>Please choose proposal type</TextMedium>
      </RowGapBlock>
      <Row>
        <List>
          {Object.entries(proposalDescriptions).map(([type, description], i) => (
            <TypeListItem
              key={type}
              onClick={() => selectType(type as ProposalType)}
              active={type === chosenType}
              disabled={!enabledProposals.includes(type as ProposalType)}
            >
              <TypeItemWrap>
                <h5>{camelCaseToText(type)}</h5>
                <TextMedium light>
                  ({i + 1}) {description}
                </TextMedium>
                <CSSTransition
                  in={type === chosenType}
                  classNames="ActiveTypeIcon"
                  timeout={Transitions.durationNumeric}
                  unmountOnExit
                >
                  <ActiveTypeIndicator>
                    <CheckboxIcon />
                  </ActiveTypeIndicator>
                </CSSTransition>
              </TypeItemWrap>
            </TypeListItem>
          ))}
        </List>
      </Row>
    </RowGapBlock>
  )
}

export const TypeItemWrap = styled(RowGapBlock)`
  position: relative;
  min-height: 100px;
  padding: 16px 40px 16px 24px;
`

export const TypeListItem = styled(ListItem)<{ active: boolean; disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  ${TypeItemWrap} > h5 {
    transition: ${Transitions.all};
  }

  ${({ active }) =>
    active &&
    css`
      border-color: ${Colors.Blue[100]};
      background-color: ${Colors.Blue[50]};
      z-index: 2;
      ${TypeItemWrap} > h5 {
        color: ${Colors.Blue[500]};
      }
    `};
  ${({ disabled }) =>
    disabled
      ? css`
          background-color: ${Colors.Black[50]};
          z-index: 0;

          ${TypeItemWrap} > h5 {
            color: ${Colors.Black[500]};
          }
          ${TextMedium} {
            color: ${Colors.Black[400]};
          }
        `
      : css`
          z-index: 1;

          &:hover {
            border-color: ${Colors.Blue[100]};

            ${TypeItemWrap} > h5 {
              color: ${Colors.Blue[500]};
            }
          }
        `};
`

const ActiveTypeIndicator = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: ${Colors.Blue[500]};
`
