import styled from 'styled-components'

import { OptionListAccount } from '@/accounts/components/SelectAccount/OptionListAccount'
import { Colors, Fonts } from '@/common/constants'

export const ModalBody = styled.div`
  padding: 24px 24px 24px;
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
`

export const AccountLocksWrapper = styled.div`
  text-align: left;
`

export const InlineLockIconWrapper = styled.div`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  margin-left: 8px;
`

export const StyledOptionListAccount = styled(OptionListAccount)`
  position: static;
  transform: none;
  width: 100%;
  border: 1px solid ${Colors.Black[200]};
  box-shadow: none;
  & li:hover {
    .accountName {
      color: inherit;
    }
  }
  & div {
    cursor: default;
  }
`

export const InfoList = styled.ul`
  list-style: disc;
  margin-left: 20px;
  font-family: ${Fonts.Inter};
  color: ${Colors.Black[600]};
`
