const FIRST_BLOCK_NUMBER = 1000

const generateBlocks = () => {
  let nextNumber = FIRST_BLOCK_NUMBER

  const generateBlock = () => ({
    network: nextNumber < 1050 ? 'Babylon' : 'Olympia',
    number: nextNumber++,
    timestamp: new Date().toJSON(),
  })

  return Array.from({ length: 1000 }, generateBlock)
}
module.exports = { generateBlocks, FIRST_BLOCK_NUMBER }
