import rawMembers from './raw/members.json'

const [alice, bob, charlie, dave, eve, ferdie] = rawMembers.map((member) => ({ roles: [], ...member }))

export { alice, bob, charlie, dave, eve, ferdie }
