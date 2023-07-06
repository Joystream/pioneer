import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons'
import { DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { Label, TextInlineSmall } from '@/common/components/typography'
import { BorderRad, Colors, Fonts } from '@/common/constants'

export const LockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`

export const AccountDetailsWrap = styled.div`
  display: grid;
  grid-template-columns: 260px repeat(4, 132px) 96px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  padding: 4px 16px;
  height: 46px;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`

export const TitleCell = styled.div`
  display: flex;
  width: 100%;
  column-gap: 16px;
`

export const DetailsName = styled.h6`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: ${Colors.Black[900]};
`

export const ValueCell = styled.div<{ isRecoverable?: boolean }>`
  grid-column: ${({ isRecoverable }) => (isRecoverable ? 4 : 3)};
`

export const ButtonsCell = styled.div`
  grid-column: 6;
  display: flex;
  column-gap: 4px;
  justify-content: flex-end;
`

export const StyledDropDown = styled(DropDownToggle)`
  display: grid;
  grid-template-columns: 236px 160px 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 25px;
  padding: 16px;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`

export const VestingStyledDropDown = styled(StyledDropDown)`
  grid-template-columns: repeat(5, 1fr);
`

export const BalanceDetails = styled.div``
export const LocksButtons = styled.div`
  grid-column: 4;
  justify-self: end;
  align-self: end;
  display: flex;
  column-gap: 10px;
`

export const DetailLabel = styled(Label)`
  display: block;
  margin-bottom: 8px;
  text-transform: uppercase;
`

export const RecoveryTimeWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`

export const LockInternalLinkButton = styled(LinkButtonGhost)`
  white-space: nowrap;
`

export const LockExternalLinkButton = styled(ButtonGhost)`
  white-space: nowrap;
`

export const UnrecoverableLabel = styled(TextInlineSmall)`
  font-family: ${Fonts.Grotesk};
`
