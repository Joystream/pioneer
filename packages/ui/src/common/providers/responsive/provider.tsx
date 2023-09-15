import React, { useEffect, useState } from 'react'

import { ResponsiveContext, UseResponsive } from '@/common/providers/responsive/context'

interface Props {
  children: React.ReactNode
}

export const ResponsiveProvider = (props: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const value: UseResponsive = {
    size:
      windowWidth >= 1440
        ? 'lg'
        : windowWidth >= 1024
        ? 'md'
        : windowWidth >= 768
        ? 'sm'
        : windowWidth >= 425
        ? 'xs'
        : 'xxs',
    isMobile: windowWidth < 1024,
  }

  return <ResponsiveContext.Provider value={value}>{props.children}</ResponsiveContext.Provider>
}
