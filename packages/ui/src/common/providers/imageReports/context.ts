import { createContext } from 'react'

import { ReportNotificationType } from '@/app/components/ImageReportNotification'
import { BlacklistRecord } from '@/common/providers/imageReports/utils'

interface UseImageReports {
  blacklistedImages: BlacklistRecord[]
  sendReport: (src: string, pathname: string) => void
  notificationStatus: ReportNotificationType
  hideNotification: () => void
}

export const ImageReportContext = createContext<UseImageReports>({
  blacklistedImages: [],
  notificationStatus: 'empty',
  hideNotification: () => undefined,
  sendReport: () => undefined,
})
