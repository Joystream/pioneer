import { useContext } from 'react'

import { ApiContext } from '../providers/context'

export const useApi = () => ({ ...useContext(ApiContext) })
