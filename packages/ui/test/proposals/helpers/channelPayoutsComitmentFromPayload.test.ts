import { generateJsonPayloadFromPayoutsVector, generateSerializedPayload } from '@joystream/js/content'

import { channelPayoutsComitmentFromPayload } from '@/proposals/helpers/channelPayoutsComitmentFromPayload'

import ChannelPayoutsVector from '../../_mocks/proposals/ChannelPayoutsVector.json'
describe('channelPayoutsComitmentFromPayload', () => {
  const [commitment, channelPayouts] = generateJsonPayloadFromPayoutsVector(ChannelPayoutsVector)
  const serializedPayload = generateSerializedPayload(channelPayouts)
  const file = new Blob([serializedPayload.buffer])

  it.only('Default', async () => {
    expect(await channelPayoutsComitmentFromPayload(file)).toBe(commitment)
  })
})
