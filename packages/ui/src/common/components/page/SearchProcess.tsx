import React from 'react'
import styled from 'styled-components'

import { Colors, Shadows } from '../../constants'
import { Loader } from '../icons'
import { SearchProcessIcon } from '../icons/SearchProcessIcon'
import { ResultTextWhite } from '../Modal'

export interface SearchingProcessProps {
  isSearching?: boolean
  title: string
  description?: string
}

export const SearchProcess = ({ title, description }: SearchingProcessProps) => {
  return (
    <SearchProcessWrapper>
      <SearchProcessContainer>
        <SearchLoader />
        <SearchProcessIconStyled />
        <SearchTitle>{title}</SearchTitle>
        <ResultTextWhite>{description}</ResultTextWhite>
      </SearchProcessContainer>
    </SearchProcessWrapper>
  )
}

const SearchProcessWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const SearchProcessContainer = styled.div`
  display: grid;
  position: relative;
  grid-row-gap: 16px;
  justify-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  height: fit-content;
  margin-top: 144px;
  padding: 48px 32px 48px;
  box-shadow: ${Shadows.common};
  background-color: ${Colors.Black[800]};
`

const SearchLoader = styled(Loader)`
  position: absolute;
  top: 16px;
  left: 16px;
`

const SearchProcessIconStyled = styled(SearchProcessIcon)`
  margin-top: 4px;
  margin-bottom: 12px;
`

const SearchTitle = styled.h4`
  color: ${Colors.White};
`
