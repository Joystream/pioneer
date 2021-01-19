import { createContext } from 'react'
import { Keyring } from '@polkadot/ui-keyring'

export const KeyringContext = createContext<Keyring>({} as Keyring)
