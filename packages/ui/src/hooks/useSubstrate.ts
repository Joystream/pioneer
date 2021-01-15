import { useContext } from 'react'
import { SubstrateContext } from '../providers/substrate/context'

export const useSubstrate = () => ({ ...useContext(SubstrateContext) })
