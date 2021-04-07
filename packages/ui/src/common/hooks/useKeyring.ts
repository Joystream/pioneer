import { useContext } from 'react'

import { KeyringContext } from '../../app/providers/keyring/context'

export const useKeyring = () => useContext(KeyringContext)
