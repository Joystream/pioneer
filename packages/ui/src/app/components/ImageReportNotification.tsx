import React, { useEffect } from 'react'

import { SideNotification } from '@/common/components/page/SideNotification'
import { useImageReport } from '@/common/hooks/useImageReport'

export type ReportNotificationType = 'new' | 'block' | 'empty' | 'error'

export const ImageReportNotification = () => {
  const { notificationStatus, hideNotification } = useImageReport()

  useEffect(() => {
    if (notificationStatus !== 'empty') {
      const timer = setTimeout(() => hideNotification(), 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [notificationStatus])

  if (notificationStatus === 'empty') {
    return null
  }

  const { message, title } = getImageReportMeta(notificationStatus)

  return (
    <SideNotification
      showClose
      isError={notificationStatus !== 'new'}
      onClick={() => undefined}
      title={title}
      message={message}
    />
  )
}

const getImageReportMeta = (type: Exclude<ReportNotificationType, 'empty'>) => {
  switch (type) {
    case 'block':
      return {
        title: 'You already reported this image!',
        message: 'Report was block to prevent spam. Please report images only once.',
      }
    case 'error':
      return {
        title: 'Report request failed!',
        message: 'Report request failed due to server error.',
      }
    case 'new':
      return {
        title: 'Image reported!',
        message:
          'Thank you for your report. Joystream DAO will be reviewing it shortly and taking action if necessary.',
      }
  }
}
