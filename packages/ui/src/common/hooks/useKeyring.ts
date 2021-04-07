import { useContext } from 'react'

import { KeyringContext } from '../providers/keyring/context'

export const useKeyring = () => useContext(KeyringContext)
