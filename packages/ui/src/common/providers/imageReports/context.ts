import { createContext } from 'react'

import { ReportNotificationType } from '@/app/components/ImageReportNotification'

interface UseImageReports {
  blacklistedImages: string[]
  userReportedImages: string[]
  sendReport?: (src: string) => Promise<void>
  reportFormUrl?: (src: string) => string
  notificationStatus: ReportNotificationType
  hideNotification: () => void
}

export const ImageReportContext = createContext<UseImageReports>({
  blacklistedImages: [],
  userReportedImages: [],
  notificationStatus: 'empty',
  hideNotification: () => undefined,
})
