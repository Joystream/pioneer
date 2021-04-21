import { act, renderHook } from '@testing-library/react-hooks'
import * as Yup from 'yup'

import { useForm } from '../../../src/common/hooks/useForm'

interface TestForm {
  aString: string
  aNumber: number
  aBoolean: boolean
}

describe('useForm', () => {
  const OptionalSchema = Yup.object().shape({
    aString: Yup.string(),
    aNumber: Yup.number(),
    aBoolean: Yup.boolean(),
  })

  const RequiredSchema = Yup.object().shape({
    aString: Yup.string().required(),
    aNumber: Yup.number().required(),
    aBoolean: Yup.boolean().required(),
  })

  it('Valid initializer', () => {
    const { result } = renderHook(() =>
      useForm<TestForm>(
        {
          aBoolean: true,
          aNumber: 0,
          aString: '',
        },
        OptionalSchema
      )
    )

    expect(result.current.validation.isValid).toBeTruthy()
    expect(result.current.validation.errors).toHaveLength(0)
    expect(result.current.fields).toEqual({
      aBoolean: true,
      aNumber: 0,
      aString: '',
    })
  })

  it('Invalid initializer', () => {
    const { result } = renderHook(() =>
      useForm<Partial<TestForm>>(
        {
          aBoolean: undefined,
          aNumber: undefined,
          aString: undefined,
        },
        RequiredSchema
      )
    )

    expect(result.current.validation.isValid).toBeFalsy()
    expect(result.current.validation.errors).toHaveLength(3)
  })

  it('Validates form on changes', async () => {
    const { result } = renderHook(() =>
      useForm<Partial<TestForm>>(
        {
          aBoolean: undefined,
          aNumber: undefined,
          aString: undefined,
        },
        RequiredSchema
      )
    )

    expect(result.current.validation.isValid).toBeFalsy()
    expect(result.current.validation.errors).toHaveLength(3)

    act(() => {
      result.current.changeField('aNumber', 1)
    })

    expect(result.current.validation.isValid).toBeFalsy()
    expect(result.current.validation.errors).toHaveLength(2)

    act(() => {
      result.current.changeField('aBoolean', true)
      result.current.changeField('aString', 'foo')
    })

    expect(result.current.validation.isValid).toBeTruthy()
    expect(result.current.validation.errors).toHaveLength(0)
  })
})
