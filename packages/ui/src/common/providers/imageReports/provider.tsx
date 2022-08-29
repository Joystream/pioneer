import React, { ReactNode, useState } from 'react'

import { ReportNotificationType } from '@/app/components/ImageReportNotification'
import { ImageReportContext } from '@/common/providers/imageReports/context'
import { postImageReport } from '@/common/providers/imageReports/utils'

interface Props {
  children: ReactNode
}

export const ImageReportProvider = (props: Props) => {
  const [showNotification, setShowNotification] = useState<ReportNotificationType>('empty')
  const [sessionUserReports, setUserReports] = useState<string[]>([])

  const sendReport = (src: string) => {
    setShowNotification('empty')
    if (sessionUserReports.includes(src)) {
      setShowNotification('block')
      return
    }

    postImageReport(src).then((res: Response) => {
      if (res.status === 200) {
        setUserReports((prev) => [...prev, src])
        setShowNotification('new')
      } else {
        setShowNotification('error')
      }
    })
  }

  return (
    <ImageReportContext.Provider
      value={{
        sendReport,
        blacklistedImages: (process.env.blacklistedImages ?? []) as string[],
        notificationStatus: showNotification,
        hideNotification: () => setShowNotification('empty'),
      }}
    >
      {props.children}
    </ImageReportContext.Provider>
  )
}
