import React, { ReactNode } from 'react'
import styled, { ThemedStyledProps, css } from 'styled-components'

import { ConnectionStatusDot } from '@/app/components/ConnectionStatusDot'
import { useEscape } from '@/common/hooks/useEscape'

import { Animations, BorderRad, BreakPoints, Colors, Fonts, RemoveScrollbar, Shadows, ZIndex } from '../../constants'
import { CloseButton } from '../buttons'
import { TextMedium, ValueInJoys } from '../typography'

interface ModalHeaderBasicProps {
  onClick: () => void
  icon?: React.ReactElement | string
  modalHeaderSize?: 's' | 'm' | undefined
  className?: string
  dark?: boolean
}

interface ModalHeaderProps extends ModalHeaderBasicProps {
  title: string | React.ReactNode
}

interface ModalCustomHeaderProps extends ModalHeaderBasicProps {
  children?: React.ReactNode
}

export const ModalHeader = React.memo(
  ({ onClick, title, icon, modalHeaderSize, className, dark }: ModalHeaderProps) => (
    <ModalTopBar columns={icon ? 3 : 2} modalHeaderSize={modalHeaderSize} className={className} dark={dark}>
      {icon ? <ModalHeaderIcon>{icon}</ModalHeaderIcon> : null}
      <ModalTitle>{title}</ModalTitle>
      <CloseButton onClick={onClick} />
    </ModalTopBar>
  )
)

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

  return (
    <>
      <ModalGlass onClick={onBackgroundClick} />
      <ModalWrap modalMaxSize={modalSize} modalHeight={modalHeight} isDark={isDark} role="modal" className={className}>
        {children}
      </ModalWrap>
    </>
  )
}

export const ModalGlass = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.Black[700.85]};
  color: ${Colors.Black[900]};
  z-index: ${ZIndex.modal};
  ${Animations.showModalBackground};

  & + & {
    display: none;
  }
`

interface TopBarProps extends ThemedStyledProps<any, any> {
  columns: number
  modalHeaderProps?: 's' | 'm' | undefined
  className?: string
  dark?: boolean
}

export const ModalTopBar = styled.header<TopBarProps>`
  display: grid;
  position: relative;
  grid-auto-flow: column;
  grid-area: modalheader;
  background-color: ${(props) => (props.dark ? `${Colors.Black[800]}` : '')};
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
  overflow-y: auto;
  display: grid;
  grid-area: modalbody;
  grid-row-gap: 16px;
  padding: 24px 24px 24px;
  background-color: ${Colors.Black[50]};
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
`

interface ModalFooterProps {
  children?: ReactNode
  className?: string
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <ModalFooterComponent className={className}>
      {children}
      <ModalConnectionStatusDot onlyPerformance />
    </ModalFooterComponent>
  )
}

const ModalConnectionStatusDot = styled(ConnectionStatusDot)`
  position: absolute;
  right: 5px;
  top: calc(50% - 10px);
`

export const ModalFooterComponent = styled.footer`
  display: inline-flex;
  flex-wrap: wrap;
  grid-area: modalfooter;
  gap: 16px;
  justify-self: end;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: content-fit;
  min-height: 64px;
  padding: 12px 26px 12px 24px;
  border-radius: 0 0 2px 2px;
  position: relative;
  max-width: 100vw;

  > :nth-child(1) {
    margin: 0 auto 0 0;
  }
  > :nth-last-child(1) {
    margin: 0 0 0 auto;
  }

  @media (min-width: ${BreakPoints.sm}px) {
    flex-wrap: nowrap;
  }
`

interface ModalWrapProps {
  modalMaxSize: string
  isDark?: boolean
  modalHeight?: ModalHeight
}

export const ModalWrap = styled.section<ModalWrapProps>`
  z-index: ${ZIndex.modal};
  position: absolute;
  inset: 0;
  ${({ modalMaxSize }) => {
    switch (modalMaxSize) {
      case 'm':
      case 'l':
        // HACK: Move modals to the top on mobile because SubWallet shows the keyboard on the viewport
        // instead of reducing the viewport size (at least on Android).
        return css`
          @media (max-width: ${BreakPoints.sm - 1}px) {
            bottom: auto;
          }
        `
    }
  }};
  margin: auto auto;
  display: grid;
  @media only screen and (max-height: 700px) {
    max-height: 100%;
  }
  grid-template-columns: 1fr;
  grid-template-rows: ${({ modalHeight }) => (modalHeight === 'xl' ? '56px 1fr 64px' : 'auto 1fr auto')};
  grid-template-areas:
    'modalheader'
    'modalbody'
    'modalfooter';
  grid-area: modal;
  background-color: ${Colors.White};
  width: 100%;
  @media (min-width: ${BreakPoints.sm}px) {
    width: calc(100% - 64px);
  }
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
  height: ${({ modalHeight }) => (modalHeight === 'xl' ? '90vh' : 'min-content')};
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.common};
  // ${Animations.showModalBlock};
  &,
  ${ModalBody}, ${ModalTopBar}, ${ModalFooterComponent} {
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
    max-height: 100%;
    @media only screen and (min-height: 800px) {
      max-height: calc(100% - 128px);
    }
    grid-template-rows: auto 1fr auto;
    position: fixed;
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
