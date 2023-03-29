import React, { useState } from 'react'

import { NetworkType } from '@/app/config'
import { InputText } from '@/common/components/forms'
import { QuestionIcon } from '@/common/components/icons/QuestionIcon'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SettingsInformation } from '@/common/components/SettingsInformation'

export const CustomForm = (props: { switchNetwork: (network: NetworkType) => void }) => {
  const { switchNetwork } = props
  const [rpc, setRpc] = useState('')
  const [qn, setQn] = useState('')
  const [faucet, setFaucet] = useState('')
  const [backend, setBackend] = useState('')

  /** const settings = {
    nodeRpcEndpoint: rpc,
    queryNodeEndpoint: qn,
    queryNodeEndpointSubscription: qn,
    membershipFaucetEndpoint: faucet,
    //configEndpoint: '',
  } **/

  const handleChange = (e: any) => {
    const { name, value } = e.target

    name === 'rpc' && setRpc(value)
    name === 'qn' && setQn(value)
    name === 'faucet' && setFaucet(value)
    name === 'backend' && setBackend(value)
  }

  return (
    <SettingsInformation icon={<QuestionIcon />} title="Custom Network Settings">
      <RowGapBlock gap={5}>
        RPC
        <InputText name="rpc" placeholder="RPC" value={rpc} onChange={handleChange} />
      </RowGapBlock>
      <RowGapBlock gap={5}>
        QN
        <InputText name="qn" placeholder="QN" value={qn} onChange={handleChange} />
      </RowGapBlock>
      <RowGapBlock gap={5}>
        Faucet
        <InputText name="faucet" placeholder="Faucet" value={faucet} onChange={handleChange} />
      </RowGapBlock>
      <RowGapBlock gap={5}>
        Backend
        <InputText name="backend" placeholder="Backend" value={backend} onChange={handleChange} />
      </RowGapBlock>
      <button onClick={() => switchNetwork('custom')}>Apply</button>
    </SettingsInformation>
  )
}
