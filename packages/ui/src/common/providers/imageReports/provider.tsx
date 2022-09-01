import React, { ReactNode, useCallback, useState } from 'react'

import { ReportNotificationType } from '@/app/components/ImageReportNotification'
import { ImageReportContext } from '@/common/providers/imageReports/context'
import { ImageSafetyApi } from '@/common/utils/ImageSafetyApi'

interface Props {
  children: ReactNode
}

export const ImageReportProvider = (props: Props) => {
  const [showNotification, setShowNotification] = useState<ReportNotificationType>('empty')
  const [sessionUserReports, setUserReports] = useState<string[]>([])

  const sendReport = useCallback(
    (src: string) => {
      setShowNotification('empty')
      if (sessionUserReports.includes(src)) {
        setShowNotification('block')
        return
      }

      ImageSafetyApi.report(src).then((res: Response) => {
        if (res.status === 200) {
          setUserReports((prev) => [...prev, src])
          setShowNotification('new')
        } else {
          setShowNotification('error')
        }
      })
    },
    [sessionUserReports]
  )

  return (
    <ImageReportContext.Provider
      value={{
        sendReport,
        blacklistedImages: (process.env.BLACKLISTED_IMAGES ?? []) as string[],
        notificationStatus: showNotification,
        hideNotification: () => setShowNotification('empty'),
      }}
    >
      {props.children}
    </ImageReportContext.Provider>
  )
}
