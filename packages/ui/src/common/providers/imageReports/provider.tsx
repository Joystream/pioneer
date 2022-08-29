import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { ReportNotificationType } from '@/app/components/ImageReportNotification'
import { ImageReportContext } from '@/common/providers/imageReports/context'
import { BlacklistRecord, postImageReport, receiveImageBlacklist } from '@/common/providers/imageReports/utils'

interface Props {
  children: ReactNode
}

export const ImageReportProvider = (props: Props) => {
  const [blacklistedImages, setBlacklistedImages] = useState<BlacklistRecord[]>([])
  const [showNotification, setShowNotification] = useState<ReportNotificationType>('empty')
  const [sessionUserReports, setUserReports] = useState<string[]>([])

  useEffect(() => {
    receiveImageBlacklist().then((blacklistJSON) => setBlacklistedImages(blacklistJSON.records ?? []))
  }, [])

  const sendReport = (src: string, pathname: string) => {
    setShowNotification('empty')
    if (sessionUserReports.includes(src)) {
      setShowNotification('block')
      return
    }

    postImageReport(src, pathname).then((res: Response) => {
      if (res.status === 200) {
        setUserReports((prev) => [...prev, src])
        setShowNotification('new')
      }
    })
  }

  return (
    <ImageReportContext.Provider
      value={{
        sendReport,
        blacklistedImages,
        notificationStatus: showNotification,
        hideNotification: () => setShowNotification('empty'),
      }}
    >
      {props.children}
    </ImageReportContext.Provider>
  )
}
