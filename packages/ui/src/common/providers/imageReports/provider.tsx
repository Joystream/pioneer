import React, { ReactNode, useCallback, useState } from 'react'

import { ReportNotificationType } from '@/app/components/ImageReportNotification'
import { error } from '@/common/logger'
import { ImageReportContext } from '@/common/providers/imageReports/context'
import { report } from '@/common/utils/ImageSafetyApi'

interface Props {
  children: ReactNode
}

export const ImageReportProvider = (props: Props) => {
  const [showNotification, setShowNotification] = useState<ReportNotificationType>('empty')
  const [userReportedImages, setUserReported] = useState<string[]>([])
  const formUrlTemplate = process.env.REACT_APP_IMAGE_REPORT_FORM_URL ?? ''
  const isImageReportApiEnabled = !formUrlTemplate && !!process.env.REACT_APP_IMAGE_REPORT_API_URL

  const reportFormUrl = useCallback(
    (src: string) => {
      const image = encodeURIComponent(src)
      const context = encodeURIComponent(location.href)
      const href = encodeURI(formUrlTemplate)
      return href.replace('%7Bimage%7D', image).replace('%7Bcontext%7D', context)
    },
    [formUrlTemplate]
  )

  const sendReport = useCallback(
    async (src: string) => {
      setShowNotification('empty')
      if (userReportedImages.includes(src)) {
        return setShowNotification('block')
      }

      try {
        const res = await report(src)
        if (res?.status === 200) {
          setUserReported((prev) => [...prev, src])
          return setShowNotification('new')
        }
      } catch (err) {
        error(err)
      }

      setShowNotification('error')
    },
    [userReportedImages]
  )

  return (
    <ImageReportContext.Provider
      value={{
        sendReport: isImageReportApiEnabled ? sendReport : undefined,
        reportFormUrl: formUrlTemplate ? reportFormUrl : undefined,
        blacklistedImages: process.env.REACT_APP_BLACKLISTED_IMAGES?.split(' ') ?? [],
        userReportedImages,
        notificationStatus: showNotification,
        hideNotification: () => setShowNotification('empty'),
      }}
    >
      {props.children}
    </ImageReportContext.Provider>
  )
}
