import { createContext } from 'react'
import { Keyring } from '@polkadot/ui-keyring/Keyring'

export const KeyringContext = createContext<Keyring>({} as Keyring)
