import { useContext } from 'react'

import { ApiContext } from '../providers/api/context'

export const useApi = () => ({ ...useContext(ApiContext) })
