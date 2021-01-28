import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Shadows } from '../constants'
import { Close } from './buttons/CloseCross'
import { ArrowOutsideIcon, ArrowOutsideStyles } from './icons/ArrowOutsideIcon'
import { CrossIcon } from './icons/CrossIcon'

interface Props {
  onClick: () => void
  title: string
}

export function ModalHeader({ onClick, title }: Props) {
  return (
    <ModalTopBar>
      <CloseButton onClick={onClick}>
        <CrossIcon />
      </CloseButton>
      <ArrowOutsideIcon />
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
const ModalGlass = styled.div`
  display: grid;
  grid-template-columns: minmax(80px, 1.2fr) minmax(max-content, 904px) minmax(60px, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: '. modal .';
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 136px;
  background-color: ${Colors.Black[700.75]};
  z-index: 100000;
`
const ModalWrap = styled.section`
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
const ModalTopBar = styled.header`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-area: modalheader;
  justify-content: start;
  align-items: center;
  padding: 24px;
  border-radius: 2px 2px 0px 0px;

  ${ArrowOutsideStyles} {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`
export const ModalBody = styled.div`
  display: grid;
  grid-area: modalbody;
  grid-row-gap: 24px;
  padding: 16px 24px 40px;
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
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
const ModalTitle = styled.h4``
const CloseButton = styled(Close)`
  position: absolute;
  right: 16px;
`
