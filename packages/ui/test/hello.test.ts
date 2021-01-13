import { expect } from 'chai'
import { hello } from '../src/model/hello'

describe('Hello', () => {
  it('Says hello', () => {
    expect(hello()).to.eq('Hello!')
  })
})
