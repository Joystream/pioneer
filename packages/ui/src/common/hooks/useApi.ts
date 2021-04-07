import { useContext } from 'react'

import { ApiContext } from '../../app/providers/api/context'

export const useApi = () => ({ ...useContext(ApiContext) })
