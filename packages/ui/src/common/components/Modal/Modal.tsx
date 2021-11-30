import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemedStyledProps } from 'styled-components'

import { useEscape } from '@/common/hooks/useEscape'

import { Animations, BorderRad, Colors, Fonts, RemoveScrollbar, Shadows, ZIndex } from '../../constants'
import { CloseButton } from '../buttons'
import { TextMedium, ValueInJoys } from '../typography'

interface ModalHeaderBasicProps {
  onClick: () => void
  icon?: React.ReactElement | string
  modalHeaderSize?: 's' | 'm' | undefined
  className?: string
}

interface ModalHeaderProps extends ModalHeaderBasicProps {
  title: string
}

interface ModalCustomHeaderProps extends ModalHeaderBasicProps {
  children?: React.ReactNode
}

export const ModalHeader = React.memo(({ onClick, title, icon, modalHeaderSize, className }: ModalHeaderProps) => (
  <ModalTopBar columns={icon ? 3 : 2} modalHeaderSize={modalHeaderSize} className={className}>
    {icon ? <ModalHeaderIcon>{icon}</ModalHeaderIcon> : null}
    <ModalTitle>{title}</ModalTitle>
    <CloseButton onClick={onClick} />
  </ModalTopBar>
))

export const ModalCustomContentHeader = React.memo(
  ({ onClick, children, icon, modalHeaderSize, className }: ModalCustomHeaderProps) => (
    <ModalCustomTopBar columns={icon ? 3 : 2} modalHeaderSize={modalHeaderSize} className={className}>
      {icon ? <ModalHeaderIcon>{icon}</ModalHeaderIcon> : null}
      <ModalHeaderCustomContent>{children}</ModalHeaderCustomContent>
      <CloseButton onClick={onClick} />
    </ModalCustomTopBar>
  )
)

type ModalSize = 'xs' | 's' | 'm' | 'l'
type ModalHeight = 's' | 'm' | 'l' | 'xl'

interface ModalProps {
  onClose: () => void
  modalSize: ModalSize
  modalHeight?: ModalHeight
  children: ReactNode
  isDark?: boolean
  className?: any
}

export const Modal = ({ onClose, modalHeight = 'm', children, modalSize, isDark, className }: ModalProps) => {
  function onBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEscape(() => onClose())

  return ReactDOM.createPortal(
    <ModalGlass
      modalHeight={modalHeight}
      modalSize={modalSize}
      isDark={isDark}
      onClick={onBackgroundClick}
      onClose={onClose}
    >
      <ModalWrap modalMaxSize={modalSize} modalHeight={modalHeight} isDark={isDark} role="modal" className={className}>
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
        return '120px'
      case 'l':
        return '44px'
      case 'xl':
        return '40px'
    }
  }};
  padding-bottom: ${({ modalHeight }) => {
    switch (modalHeight) {
      case 'xl':
        return '40px'
    }
  }};
  background-color: ${Colors.Black[700.85]};
  color: ${Colors.Black[900]};
  z-index: ${ZIndex.modal};
  ${Animations.showModalBackground};
`

interface TopBarProps extends ThemedStyledProps<any, any> {
  columns: number
  modalHeaderProps?: 's' | 'm' | undefined
  className?: string
}

export const ModalTopBar = styled.header<TopBarProps>`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-area: modalheader;
  grid-template-columns: ${(props) => (props.columns > 2 ? '24px 1fr 20px' : '1fr 20px')};
  justify-content: start;
  grid-column-gap: 8px;
  align-items: center;
  height: ${({ modalHeaderSize }) => {
    switch (modalHeaderSize) {
      case 's':
        return '48px'
      case 'm':
      case undefined:
      default:
        return '56px'
    }
  }};
  padding: ${({ modalHeaderSize }) => {
    switch (modalHeaderSize) {
      case 's':
        return '24px 24px 0px'
      case 'm':
      case undefined:
      default:
        return '16px 24px'
    }
  }};
  border-radius: 2px 2px 0 0;
`

export const ModalCustomTopBar = styled(ModalTopBar)`
  padding: 4px 24px;
`

export const ModalBody = styled.div`
  display: grid;
  grid-area: modalbody;
  grid-row-gap: 16px;
  padding: 24px 24px 24px;
  background-color: ${Colors.Black[50]};
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
`

export const ModalFooter = styled.footer<{ twoColumns?: boolean }>`
  display: inline-grid;
  grid-area: modalfooter;
  grid-template-columns: ${({ twoColumns }) => (twoColumns ? '1fr auto' : '1fr')};
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  grid-column-gap: 40px;
  justify-self: end;
  justify-items: end;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 12px 24px;
  border-radius: 0 0 2px 2px;
`

export const ModalFooterGroup = styled.div<{ left?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  width: fit-content;
  height: 100%;
  justify-self: ${({ left }) => (left ? 'start' : 'end')};
  grid-column-gap: 40px;
  justify-items: ${({ left }) => (left ? 'start' : 'end')};
  justify-content: ${({ left }) => (left ? 'start' : 'end')};
`

interface ModalWrapProps {
  modalMaxSize: string
  isDark?: boolean
  modalHeight?: ModalHeight
}

export const ModalWrap = styled.section<ModalWrapProps>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${({ modalHeight }) => (modalHeight === 'xl' ? '56px 1fr 64px' : 'auto auto auto')};
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
  height: ${({ modalHeight }) => (modalHeight === 'xl' ? '100%' : 'min-content')};
  max-height: 800px;
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.common};
  ${Animations.showModalBlock};
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

export const ScrolledModal = styled(Modal)`
  &${ModalWrap} {
    max-height: calc(100% - 128px);
    grid-template-rows: auto 1fr auto;
  }
`

export const ScrolledModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  grid-row-gap: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 0;
  overflow-y: scroll;
  ${RemoveScrollbar};
`

export const ScrolledModalContainer = styled.div`
  display: grid;
  grid-row-gap: 16px;
  width: 100%;
  height: 100%;
  padding: 24px 24px 20px;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    visibility: hidden;
  }
`

export const ScrollableModalColumn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 24px;
  overflow-y: scroll;
  ${RemoveScrollbar};
`

export const ResultModalBody = styled(ModalBody)`
  position: relative;
  grid-row-gap: 16px;
  padding: 8px 40px 40px;
  justify-items: center;
  border: none;
  background-color: ${Colors.White};
`

export const SuccessModalBody = styled(ModalBody)`
  grid-row-gap: 8px;
  background-color: ${Colors.White};
  border: none;
  padding: 8px 24px 24px;
`

export const SignTransferContainer = styled.div`
  display: grid;
  grid-row-gap: 8px;
  width: 100%;
  height: 100%;
`

export const ModalTitle = styled.h5`
  .red-title {
    color: ${Colors.Red[400]};
  }
`

export const ModalHeaderCustomContent = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
`

export const ResultText = styled(TextMedium)`
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
