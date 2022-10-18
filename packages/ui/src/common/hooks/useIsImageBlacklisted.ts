import { useMemo } from 'react'

import { useImageReport } from './useImageReport'

export const useIsImageBlacklisted = (src?: string): boolean => {
  const { blacklistedImages } = useImageReport()
  return useMemo(() => !!src && blacklistedImages.some((url) => url === src), [src, blacklistedImages.length])
}
