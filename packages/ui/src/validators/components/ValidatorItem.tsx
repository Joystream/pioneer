import React, { useState, useMemo } from "react"
import styled from "styled-components"
import BN from 'bn.js'

import { Address } from "@/common/types"
import { BorderRad, Colors, Sizes, Transitions } from "@/common/constants"
import { TableListItemAsLinkHover } from "@/common/components/List"
import { Skeleton } from "@/common/components/Skeleton"
import { DropDownButton, DropDownToggle } from "@/common/components/buttons/DropDownToggle"
import { RowGapBlock } from "@/common/components/page/PageContent"
import { AccountInfo } from "@/accounts/components/AccountInfo"
import { TokenValue } from "@/common/components/typography"
import { AccountLocks } from "@/accounts/components/AccountLocks"
import { isDefined, sumBN } from "@/common/utils"
import { TransferButton } from "@/accounts/components/TransferButton"
import { LocksDetails } from "@/accounts/components/AccountItem/components/LocksDetails"
import { useBalance } from "@/accounts/hooks/useBalance"
import { useMyAccounts } from "@/accounts/hooks/useMyAccounts"

type ValidatorItemProps = {
	validator:Address
}
export const ValidatorItem=({validator}:ValidatorItemProps)=>{
	console.log(validator)
	const validatorAccount=useMemo(()=>({
		name:'',
		address:validator,
		source:'',
	}),[validator])
	const [isDropped, setDropped] = useState(false)
  
	return (
	  <ValidatorItemWrapper>
		<ValidatorItemWrap key={validator} onClick={() => setDropped(!isDropped)}>
		  <AccountInfo account={validatorAccount} />
		</ValidatorItemWrap>
	  </ValidatorItemWrapper>
	)
}


const ValidatorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const ValidatorItemWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(4, 128px) 104px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;

  ${Skeleton} {
    min-width: 100%;
    height: 1.2rem;
  }
`

const AccountControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 32px);
  grid-template-rows: 32px;
  grid-column-gap: 4px;
`
const StyledDropDown = styled(DropDownToggle)`
  row-gap: 16px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
`

const ValueAndLocks = styled(RowGapBlock)`
  position: relative;
`
