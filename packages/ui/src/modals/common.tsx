import styled from 'styled-components'
import { BorderRad, Colors } from '../constants'

export const FormLabel = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  font-weight: 700;
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
  min-height: 94px;
  padding: 16px 132px 16px 14px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`
export const LockedAccount = styled(AccountRow)`
  background-color: ${Colors.Black[50]};
`
export const TransactionAmount = styled.div`
  display: grid;
  grid-template-columns: 284px auto;
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
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
  grid-template-columns: 1fr 128px;
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
  color: ${Colors.Black[900]};
`
export const TransactionAmountInfoText = styled.span`
  padding: 0 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  text-transform: uppercase;
  border-radius: ${BorderRad.m};
  background-color: ${Colors.Black[75]};

  .TokenValue {
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    color: ${Colors.Black[900]};
  }
`
