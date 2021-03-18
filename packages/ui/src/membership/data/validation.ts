import BN from 'bn.js'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

export const AccountSchema = Yup.object()

export const MemberSchema = Yup.object()

export const AvatarURISchema = Yup.string().url()

export const HandleSchema = Yup.string().test('handle', 'This handle is already taken', (value, testContext) => {
  return testContext?.options?.context?.size?.lte(new BN(0)) ?? false
})

export const ReferrerSchema = Yup.object().when('isReferred', (isReferred: boolean, schema: AnySchema) => {
  return isReferred ? schema.required() : schema
})
