import { useContext } from 'react'

import { ResponsiveContext } from '@/common/providers/responsive/context'

export const useResponsive = () => useContext(ResponsiveContext)
