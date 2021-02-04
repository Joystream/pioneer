import styled from 'styled-components'
import { BorderRad, Colors, Sizes } from '../constants'
import { Icon } from '../components/icons/ArrowDownExpandedIcon'

export const FormLabel = styled.span`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  font-weight: 700;
`
export const TransactionInfoLabel = styled(FormLabel)`
  margin-bottom: 32px;
  font-weight: 400;

  .TokenValue {
    font-weight: 700;
    color: ${Colors.Black[700]};
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
  min-height: ${Sizes.accountHeight};
  padding: 8px 72px 8px 14px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`
export const LockedAccount = styled(AccountRow)`
  height: ${Sizes.accountSelectHeight};
  min-height: ${Sizes.accountSelectHeight};
  max-height: ${Sizes.accountSelectHeight};
  background-color: ${Colors.Black[75]};
  border: 1px solid ${Colors.Black[200]};
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
  display: flex;
  flex-direction: column;
`
export const BalanceInfo = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 168px;
  grid-template-rows: 1fr;
  align-items: center;

  & + & {
    margin-top: 4px;
  }
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
  display: grid;
  position: relative;
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

  .TokenValue {
    font-size: 10px;
    line-height: 16px;
    font-weight: 700;
    color: ${Colors.Black[700]};
  }
  ${Icon} {
    width: 16px;
    height: 16px;
  }
`
