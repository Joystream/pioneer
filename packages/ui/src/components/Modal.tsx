import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemedStyledProps } from 'styled-components'
import { BorderRad, Colors, Fonts, Shadows } from '../constants'
import { CloseButton } from './buttons'
import { Text, ValueInJoys } from './typography'

interface Props {
  onClick: () => void
  title: string
  icon?: React.ReactElement | string
}

export const ModalHeader = React.memo(({ onClick, title, icon }: Props) => (
  <ModalTopBar columns={icon ? 3 : 2}>
    {icon ? <ModalHeaderIcon>{icon}</ModalHeaderIcon> : null}
    <ModalTitle>{title}</ModalTitle>
    <CloseModalButton onClick={onClick} />
  </ModalTopBar>
))

interface ModalProps {
  onClose: () => void
  modalSize: string
  modalHeight?: string
  children: ReactNode
  isDark?: boolean
}

export const Modal = ({ onClose, modalHeight = 'm', children, modalSize, isDark }: ModalProps) => {
  function onBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return ReactDOM.createPortal(
    <ModalGlass
      modalHeight={modalHeight}
      modalSize={modalSize}
      isDark={isDark}
      onClick={onBackgroundClick}
      onClose={onClose}
    >
      <ModalWrap modalMaxSize={modalSize} modalHeight={modalHeight} isDark={isDark} role="modal">
        {children}
      </ModalWrap>
    </ModalGlass>,
    document.body
  )
}

export const ModalGlass = styled.div<ModalProps>`
  display: flex;
  justify-content: center;
  align-items: ${({ modalHeight }) => {
    switch (modalHeight) {
      case 's':
        return 'center'
    }
  }};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: ${({ modalHeight }) => {
    switch (modalHeight) {
      case 's':
        return '0px'
      case 'm':
        return '64px'
      case 'l':
        return '48px'
    }
  }};
  border: 10px solid red;
  padding-left: ${({ modalHeight }) => {
    switch (modalHeight) {
      case 'm':
        return '44px'
    }
  }};
  background-color: ${Colors.Black[700.75]};
  color: ${Colors.Black[900]};
  z-index: 100000;
`

interface TopBarProps extends ThemedStyledProps<any, any> {
  columns: number
}

export const ModalTopBar = styled.header.attrs((props: TopBarProps) => ({
  columns: props.columns,
}))`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-area: modalheader;
  grid-template-columns: ${(props) => (props.columns > 2 ? 'auto 1fr 40px' : '1fr 40px')};
  justify-content: start;
  grid-column-gap: 16px;
  align-items: center;
  height: 76px;
  padding: 24px;
  border-radius: 2px 2px 0 0;
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
  height: 72px;
  padding: 12px 16px;
  border-radius: 0 0 2px 2px;
`

interface ModalWrapProps {
  modalMaxSize: string
  isDark?: boolean
  modalHeight?: string
}

export const ModalWrap = styled.section<ModalWrapProps>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'modalheader'
    'modalbody'
    'modalfooter';
  grid-area: modal;
  position: relative;
  background-color: ${Colors.White};
  width: 100%;
  max-width: ${({ modalMaxSize }) => {
    switch (modalMaxSize) {
      case 'xs':
        return '400px'
      case 's':
        return '720px'
      case 'm':
        return '904px'
      case 'l':
        return '1240px'
    }
  }};
  height: min-content;
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.common};
  &,
  ${ModalBody}, ${ModalTopBar}, ${ModalFooter} {
    ${({ isDark }) => {
      switch (isDark) {
        case true:
          return `
          background-color: ${Colors.Black[800]};
          color: ${Colors.White};
          `
      }
    }};
  }
  ${ModalBody} {
    ${({ isDark }) => {
      switch (isDark) {
        case true:
          return `
          border-color: ${Colors.Black[800]};
          `
      }
    }};
  }
`

export const ModalHeaderIcon = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  height: 24px;
  width: 24px;

  svg {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
`

export const ScrolledModalBody = styled(ModalBody)`
  height: 100%;
  max-height: 66vh;
  padding: 24px 24px 20px;
  overflow-y: scroll;
`

export const ResultModalBody = styled(ModalBody)`
  position: relative;
  grid-row-gap: 16px;
  padding: 48px 44px;
  justify-items: center;
  border: none;
  background-color: ${Colors.White};
  min-height: 312px;
`

export const SuccessModalBody = styled(ModalBody)`
  grid-row-gap: 8px;
  background-color: ${Colors.White};
  border: none;
  padding: 12px 24px 40px;
`

export const SignTransferContainer = styled.div`
  display: grid;
  grid-row-gap: 8px;
  width: 100%;
  height: 100%;
`

export const ModalTitle = styled.h4`
  .red-title {
    color: ${Colors.Red[400]};
  }
`

const CloseModalButton = styled(CloseButton)`
  position: absolute;
  right: 16px;
`
export const CloseSmallModalButton = styled(CloseModalButton)`
  position: absolute;
  top: 24px;
  right: 24px;
`

export const ResultText = styled(Text)`
  text-align: center;

  ${ValueInJoys} {
    font-family: ${Fonts.Inter};
    font-weight: 700;
    color: ${Colors.Black[700]};
    &:after {
      font-family: ${Fonts.Inter};
      font-weight: 700;
      color: ${Colors.Black[700]};
    }
  }
`

export const ResultTextWhite = styled(ResultText)`
  color: ${Colors.Black[400]};
`
