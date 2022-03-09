import { createContext } from 'react'

import { RefetchQuery } from '@/common/types/queries'

export type UseRefetch = [RefetchQuery, (payload: RefetchQuery) => void]

export const RefetchContext = createContext<UseRefetch>([undefined, () => undefined])
