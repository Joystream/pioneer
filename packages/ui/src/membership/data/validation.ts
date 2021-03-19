import BN from 'bn.js'
import * as Yup from 'yup'
import { AnySchema } from 'yup'
import { isValidAddress } from '../../components/account/SelectAccount/helpers'

export const AccountSchema = Yup.object()

export const MemberSchema = Yup.object()

export const AvatarURISchema = Yup.string().url()

export const HandleSchema = Yup.string().test('handle', 'This handle is already taken', (value, testContext) => {
  return testContext?.options?.context?.size?.lte(new BN(0)) ?? false
})

export const ReferrerSchema = Yup.object().when('isReferred', (isReferred: boolean, schema: AnySchema) => {
  return isReferred ? schema.required() : schema
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
