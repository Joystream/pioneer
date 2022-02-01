import styled from 'styled-components'

import { BorderRad, Colors } from '@/common/constants'

export const ratioControl = { control: { type: 'range', min: 0, max: 1, step: 0.01 } }
export const percentageControl = { control: { type: 'range', min: 0, max: 100 } }
export const voteControl = { control: { type: 'range', min: 0, max: 20 } }

export const TemplateBlock = styled.div`
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  width: 100%;
`

export const ScrollBlock = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  padding-bottom: 32px;
  overflow: scroll;
`

export const FullHeightGrid = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

export const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
`

export const Column = styled.div`
  display: grid;
  grid-row-gap: 8px;
  width: fit-content;
`

export const WhiteBlock = styled.div`
  display: flex;
  padding: 16px;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`

export const BlackBlock = styled(WhiteBlock)`
  background-color: ${Colors.Black[900]};
`

export const ModalBlock = styled(WhiteBlock)`
  background-color: ${Colors.Black[50]};
`

export const DisabledBlock = styled(WhiteBlock)`
  background-color: ${Colors.Black[75]};
`

export const ModalGlassBlock = styled(WhiteBlock)`
  background-color: ${Colors.Black[700.85]};
`

export const SideBar = styled(TemplateBlock)`
  padding: 24px;
  width: 304px;
`

export const BannerWrapper = styled.div`
  max-width: 440px;
`
