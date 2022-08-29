import { useContext } from 'react'

import { ImageReportContext } from '@/common/providers/imageReports/context'

export const useImageReport = () => useContext(ImageReportContext)
