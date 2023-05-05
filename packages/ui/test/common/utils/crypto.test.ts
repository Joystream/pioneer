import { generateJsonPayloadFromPayoutsVector, generateSerializedPayload } from '@joystream/js/content'

import { merkleRootFromBinary, hashFile } from '@/common/utils/crypto'

import ChannelPayoutsVector from '../../_mocks/proposals/ChannelPayoutsVector.json'

describe('Utils: Crypto', () => {
  const [commitment, channelPayouts] = generateJsonPayloadFromPayoutsVector(ChannelPayoutsVector)
  const serializedPayload = generateSerializedPayload(channelPayouts)
  const file = new Blob([serializedPayload])

  it('Merkle root from binary file', async () => {
    expect(await merkleRootFromBinary(file)).toBe(commitment)
  })

  it('File hash', async () => {
    expect(await hashFile(file)).toBe('gW22Sg9hMpHzog1XGwPAM7pz4As1NHDKuRoQvUpDybR6W5')
  })
})
