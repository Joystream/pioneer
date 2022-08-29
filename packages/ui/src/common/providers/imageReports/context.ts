import { createContext } from 'react'

import { ReportNotificationType } from '@/app/components/ImageReportNotification'

interface UseImageReports {
  blacklistedImages: string[]
  sendReport: (src: string) => void
  notificationStatus: ReportNotificationType
  hideNotification: () => void
}

export const ImageReportContext = createContext<UseImageReports>({
  blacklistedImages: [],
  notificationStatus: 'empty',
  hideNotification: () => undefined,
  sendReport: () => undefined,
})
