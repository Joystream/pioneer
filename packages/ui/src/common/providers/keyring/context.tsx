import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { createContext } from 'react'

export const KeyringContext = createContext<Keyring>({} as Keyring)
