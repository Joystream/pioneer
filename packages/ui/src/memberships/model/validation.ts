import BN from 'bn.js'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { StakingStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { isValidAddress } from '@/accounts/model/isValidAddress'
import { areLocksConflicting } from '@/accounts/model/lockTypes'
import { Balances, LockType } from '@/accounts/types'

export const AccountSchema = Yup.object()

export const MemberSchema = Yup.object()

export const AvatarURISchema = Yup.string().url()

export const HandleSchema = Yup.string().test('handle', 'This handle is already taken', (value, testContext) => {
  return testContext?.options?.context?.size?.lte(new BN(0)) ?? false
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

    const validationContext = context.options.context as IStakingAccountSchema
    return (
      !!validationContext?.balances &&
      (validationContext.balances as Balances).transferable.gte(validationContext.requiredAmount)
    )
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

export const NewAddressSchema = (which: string) =>
  Yup.object()
    .shape({
      name: Yup.string(),
      address: Yup.string().required(),
    })
    .test(which, 'Address is invalid', (value, testContext) => {
      const keyring = testContext?.options?.context?.keyring
      return value.address ? isValidAddress(value.address, keyring) : true
    })

Yup.addMethod(Yup.number, 'maxContext', function test(msg: string, contextPath: string) {
  // @ts-expect-error: yup
  return this.test({
    name: 'maxContext',
    exclusive: false,
    test(value: number) {
      if (!value) {
        return true
      }
      const validationValue = this.options.context?.[contextPath]

      if (!(validationValue?.gten(value) || value <= validationValue)) {
        return this.createError({ message: msg, params: { max: validationValue?.toNumber() ?? validationValue } })
      }

      return true
    },
  })
})

Yup.addMethod(Yup.number, 'minContext', function test(msg: string, contextPath: string) {
  // @ts-expect-error: yup
  return this.test({
    name: 'minContext',
    exclusive: false,
    test(value: number) {
      if (!value) {
        return true
      }
      const validationValue = this.options.context?.[contextPath]
      if (!validationValue?.lten(value) || !value >= validationValue) {
        return this.createError({ message: msg, params: { min: validationValue?.toNumber() ?? validationValue } })
      }

      return true
    },
  })
})

export default Yup
