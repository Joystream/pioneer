import React, { useState } from 'react'
import styled from 'styled-components'
import { Transitions } from '../../../constants/styles'
import { OptionListYieldMethod } from './OptionListYieldMethod'
import { YieldMethod } from './OptionYieldMethod'

export function SelectYieldMethod({ options, onChange }: OptionListYieldMethod) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<YieldMethod>(options[0])

  const onOptionClick = (option: YieldMethod) => {
    setIsOpen(false)
    setSelectedOption(option)
    onChange(option)
  }

  return (
    <SelectComponent>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        <SelectedImageWrapper>
          <SelectedImage src={selectedOption.logoURI} />
        </SelectedImageWrapper>
        <SelectedName>{selectedOption.symbol}</SelectedName>
        <SelectedValue>
          {selectedOption.value}
          {selectedOption.emptyValue !== true && <SelectedValueInfo>% APY</SelectedValueInfo>}
        </SelectedValue>
      </SelectButton>
      {isOpen && <OptionListYieldMethod onChange={onOptionClick} options={options} />}
    </SelectComponent>
  )
}

const SelectComponent = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
`

const SelectButton = styled.button`
  display: grid;
  grid-template-columns: 1.5em 1fr auto;
  grid-template-rows: 1fr;
  grid-column-gap: 0.5em;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0.5em 2em 0.5em 0.75em;
  border-radius: 0.25em;
  background: transparent;
  font-size: 1em;
  cursor: pointer;
  transition: ${Transitions.all};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0.75em;
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: translateY(-50%) scaleY(1);
    transition: ${Transitions.all};
  }

  &:hover,
  &:active,
  &:focus {
  }

  &:active,
  &:focus {
    outline: none;
    &::after {
      transform: translateY(-50%) scaleY(-1);
    }
  }
`

const SelectedImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
`

const SelectedImage = styled.img`
  width: 1.1em;
  height: 1.1em;
`

const SelectedName = styled.span`
  text-align: left;
`

const SelectedValue = styled.span`
  text-align: right;
`

const SelectedValueInfo = styled.span`
  text-align: right;
`
