import React from 'react'
import styled from 'styled-components'
import { Colors, Effects, Transitions } from '../../constants/styles'

export interface YieldMethod {
  logoURI: string
  symbol: string
  value: string
  emptyValue?: boolean
}

export interface OptionYieldMethodProps {
  option: YieldMethod
  onChange: (option: YieldMethod) => void
}

export function OptionYieldMethod({ option, onChange }: OptionYieldMethodProps) {
  const { logoURI, symbol, value } = option

  return (
    <OptionComponentContainer>
      <OptionComponent onClick={() => onChange(option)}>
        <TokenImageWrapper>
          <TokenImage src={logoURI} />
        </TokenImageWrapper>
        <TokenName>{symbol}</TokenName>
        <TokenValue>
          {value}
          {option.emptyValue !== true && <TokenValueInfo>% APY</TokenValueInfo>}
        </TokenValue>
      </OptionComponent>
    </OptionComponentContainer>
  )
}

const OptionComponentContainer = styled.li`
  display: flex;
  widht: 100%;
  height: 100%;
`

const OptionComponent = styled.button`
  display: grid;
  grid-template-columns: 1.5em 1fr auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0.5em;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 1em;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.25em;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    box-shadow: ${Effects.SelectOptionShadow};
  }
  &:active,
  &:focus {
    outline: none;
    box-shadow: ${Effects.SelectOptionShadow};
  }
`

const TokenImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
`

const TokenImage = styled.img`
  width: 1.1em;
  height: 1.1em;
`

const TokenName = styled.span`
  text-align: left;
  color: ${Colors.Dark};
`

const TokenValue = styled.span`
  text-align: right;
  color: ${Colors.DarkLight};
`

const TokenValueInfo = styled.span`
  text-align: right;
  color: ${Colors.DarkLight};
`
