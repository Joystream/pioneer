import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Text } from '../components/page/Typography/Text'
import { BorderRad, Colors, Shadows } from '../constants'
import { Close } from './buttons/CloseButton'
import { CrossIcon } from './icons/CrossIcon'

interface Props {
  onClick: () => void
  title: string
  icon?: React.ReactElement | string
}

export function ModalHeader({ onClick, title, icon }: Props) {
  return (
    <ModalTopBar>
      <CloseModalButton onClick={onClick}>
        <CrossIcon />
      </CloseModalButton>
      {icon ? <ModalHeaderIcon>{icon}</ModalHeaderIcon> : null}
      <ModalTitle>{title}</ModalTitle>
    </ModalTopBar>
  )
}

interface ModalProps {
  children: ReactNode
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <ModalGlass>
      <ModalWrap>{children}</ModalWrap>
    </ModalGlass>
  )
}
export const ResultModal = ({ children }: ModalProps) => {
  return (
    <ResultModalGlass>
      <ResultModalWrap>{children}</ResultModalWrap>
    </ResultModalGlass>
  )
}
export const ModalGlass = styled.div`
  display: grid;
  grid-template-columns: minmax(80px, 1.2fr) minmax(max-content, 904px) minmax(60px, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: '. modal .';
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 64px;
  background-color: ${Colors.Black[700.75]};
  z-index: 100000;
`
export const ResultModalGlass = styled(ModalGlass)`
  padding-top: 224px;
`
export const ModalWrap = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 76px auto 72px;
  grid-template-areas:
    'modalheader'
    'modalbody'
    'modalfooter';
  grid-area: modal;
  position: relative;
  background-color: ${Colors.White};
  width: 100%;
  max-width: 904px;
  height: min-content;
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.common};
`
export const ResultModalWrap = styled(ModalWrap)`
  justify-self: center;
  grid-template-rows: 76px auto;
  background-color: ${Colors.White};
`
export const ExtensionModalWrap = styled(ModalWrap)`
  justify-self: center;
  grid-template-rows: auto;
  max-width: 534px;
  background-color: ${Colors.White};
`
export const ModalHeaderIcon = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: fit-content;
  min-width: 28px;
  height: 100%;
  min-height: 28px;
  font-size: 28px;
  line-height: 28px;

  svg {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
`
const ModalTopBar = styled.header`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-area: modalheader;
  justify-content: start;
  grid-column-gap: 12px;
  align-items: center;
  padding: 24px;
  border-radius: 2px 2px 0px 0px;
`
export const ModalBody = styled.div`
  display: grid;
  grid-area: modalbody;
  grid-row-gap: 16px;
  padding: 24px 24px 48px;
  background-color: ${Colors.Black[50]};
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
`
export const ResultModalBody = styled(ModalBody)`
  grid-row-gap: 24px;
  padding: 40px;
  justify-items: center;
  border: none;
  background-color: ${Colors.White};
  min-height: 350px;
`
export const SuccessModalBody = styled(ResultModalBody)`
  grid-row-gap: 8px;
  padding: 8px 24px 40px;
  text-align: left;
`
export const SignTransferContainer = styled.div`
  display: grid;
  grid-row-gap: 8px;
  width: 100%;
  height: 100%;
`
export const ModalFooter = styled.footer`
  display: inline-grid;
  grid-area: modalfooter;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  grid-column-gap: 46px;
  justify-self: end;
  justify-items: end;
  align-items: center;
  width: fit-content;
  padding: 12px 16px;
  border-radius: 0px 0px 2px 2px;
`
export const ModalTitle = styled.h4``
const CloseModalButton = styled(Close)`
  position: absolute;
  right: 16px;
`
export const ResultText = styled(Text)`
  text-align: center;
`
