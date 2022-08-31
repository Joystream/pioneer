import BN from 'bn.js'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { StakingStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { isValidAddress } from '@/accounts/model/isValidAddress'
import { areLocksConflicting } from '@/accounts/model/lockTypes'
import { Balances, LockType } from '@/accounts/types'

export const AccountSchema = Yup.object()

const MAX_AVATAR_FILESIZE = 1048576
export const MemberSchema = Yup.object()
const SUPPORTED_IMAGES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/avif']
export const AvatarURISchema = process.env.REACT_APP_AVATAR_UPLOAD_URL
  ? Yup.mixed()
      .test('fileSize', 'File size is too large', (value) => !value || value.size <= MAX_AVATAR_FILESIZE)
      .test('fileType', 'This file type is not allowed', (value) => !value || SUPPORTED_IMAGES.includes(value.type))
  : Yup.string().url().nullable()

export const HandleSchema = Yup.string().test('handle', 'This handle is already taken', (value, testContext) => {
  return testContext?.options?.context?.size ? testContext?.options?.context?.size === 0 : true
})

export const ReferrerSchema = Yup.object().when('isReferred', (isReferred: boolean, schema: AnySchema) => {
  return isReferred ? schema.required() : schema
})

export interface IStakingAccountSchema {
  requiredAmount: BN
  balances: Balances
  stakeLock: LockType
  stakingStatus: StakingStatus
}

export const StakingAccountSchema = Yup.object()
  .test('balance', 'Balance on this account is insufficient', (value, context) => {
    if (!value) {
      return true
    }

    const { requiredAmount, balances } = context.options.context as IStakingAccountSchema
    return !!balances.total?.gte(requiredAmount)
  })
  .test('locks', 'This account has conflicting locks', (value, context) => {
    if (!value) {
      return true
    }

    const validationContext = context.options.context as IStakingAccountSchema
    return (
      !!validationContext?.balances &&
      !areLocksConflicting(validationContext.stakeLock, validationContext.balances.locks)
    )
  })
  .test('otherStatus', 'This account is bound to another member', (value, context) => {
    const { stakingStatus } = context.options.context as IStakingAccountSchema
    return stakingStatus !== 'other'
  })
  .test('unknownStatus', '', (value, context) => {
    const { stakingStatus } = context.options.context as IStakingAccountSchema
    return stakingStatus !== 'unknown'
  })

export const NewAddressSchema = (which: string) =>
  Yup.object()
    .shape({
      name: Yup.string(),
      address: Yup.string().required('This field is required'),
    })
    .test(which, 'Address is invalid', (value, testContext) => {
      const keyring = testContext?.options?.context?.keyring
      return value.address ? isValidAddress(value.address, keyring) : true
    })
