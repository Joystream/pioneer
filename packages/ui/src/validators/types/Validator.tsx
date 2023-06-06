import { Address } from "@/common/types"
import BN from 'bn.js'

export interface Validator {
    member: boolean
    address: Address
    verification: boolean
    state: boolean
    totalRewards: BN
    APR: Number
    startedOn: Number
}