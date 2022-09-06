import React, { ReactNode, useCallback, useState } from 'react'

import { ReportNotificationType } from '@/app/components/ImageReportNotification'
import { error } from '@/common/logger'
import { ImageReportContext } from '@/common/providers/imageReports/context'
import { ImageSafetyApi } from '@/common/utils/ImageSafetyApi'

interface Props {
  children: ReactNode
}

export const ImageReportProvider = (props: Props) => {
  const [showNotification, setShowNotification] = useState<ReportNotificationType>('empty')
  const [userReportedImages, setUserReported] = useState<string[]>([])
  const formUrlTemplate = process.env.REACT_APP_IMAGE_REPORT_FORM_URL ?? ''
  const isImageReportEnabled = !formUrlTemplate && process.env.REACT_APP_IMAGE_REPORT_ENABLED === 'true'

  const reportFormUrl = useCallback(
    (src: string) => {
      const image = encodeURIComponent(src)
      const page = encodeURIComponent(location.href)
      return formUrlTemplate.replace('{image}', image).replace('{page}', page)
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
        const res = await ImageSafetyApi.report(src)
        if (res.status === 200) {
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
        sendReport: isImageReportEnabled ? sendReport : undefined,
        reportFormUrl: formUrlTemplate ? reportFormUrl : undefined,
        blacklistedImages: JSON.parse(process.env.REACT_APP_BLACKLISTED_IMAGES ?? '[]') as string[],
        userReportedImages,
        notificationStatus: showNotification,
        hideNotification: () => setShowNotification('empty'),
      }}
    >
      {props.children}
    </ImageReportContext.Provider>
  )
}
