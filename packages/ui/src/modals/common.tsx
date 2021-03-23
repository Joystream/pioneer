import styled from 'styled-components'
import { Label } from '../components/forms'
import { Icon } from '../components/icons'
import { ValueInJoys } from '../components/typography'
import { BorderRad, Colors, Fonts, Sizes } from '../constants'

export const TransactionInfoLabel = styled(Label)`
  display: block;
  margin-bottom: 32px;
  font-weight: 400;
  font-family: ${Fonts.Inter};

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
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`
export const AccountRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  min-height: ${Sizes.accountHeight};
  max-height: ${Sizes.accountHeight};
  padding: 8px 72px 8px 14px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`
export const LockedAccount = styled(AccountRow)`
  height: ${Sizes.selectHeight};
  background-color: ${Colors.Black[75]};
`
export const TransactionAmount = styled.div`
  display: grid;
  grid-template-columns: 320px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 12px;
  align-items: end;
`
export const AmountInputBlock = styled.div`
  display: flex;
  flex-direction: column;
`
export const TransactionInfo = styled.div`
  display: grid;
`
export const BalanceInfo = styled.div`
  display: inline-grid;
  position: relative;
  grid-template-columns: 1fr 168px;
  grid-template-rows: 1fr;
  align-items: center;

  & + & {
    margin-top: 4px;
  }
`

export const BalanceInfoInRow = styled(BalanceInfo)`
  justify-self: end;
`

export const BalanceInfoNarrow = styled(BalanceInfo)`
  grid-template-columns: 1fr 128px;
  width: auto;
`

export const InfoTitle = styled.span`
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: right;
  color: ${Colors.Black[400]};
`

export const InfoValue = styled.span`
  text-align: right;
  line-height: 20px;
`

export const TransactionAmountInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  width: fit-content;
  justify-self: center;
  align-items: center;
  color: ${Colors.Black[700]};

  ${Icon.type} {
    width: 16px;
    height: 16px;
  }
`
export const TransactionAmountInfoText = styled.span`
  padding: 4px 6px;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[700]};
  text-transform: uppercase;
  border-radius: ${BorderRad.m};
  background-color: ${Colors.Blue[100]};

  ${ValueInJoys}, ${ValueInJoys}:after {
    font-size: 10px;
    line-height: 16px;
    font-weight: 700;
    color: ${Colors.Black[700]};
  }
`
