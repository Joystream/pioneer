import React from 'react'

import { Info } from '@/common/components/Info'
import { TextMedium } from '@/common/components/typography'

export const TypeSelection = () => {
  return (
    <Info
      content={
        <>
          <TextMedium margin="s">
            - you may get rejected amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit
          </TextMedium>
          <TextMedium margin="s">- you may lose a rejection fee from any required stake.</TextMedium>
          <TextMedium margin="s">
            - you may get outright slashed on top of the rejection, depending on what type of proposal this is (not true
            for all proposal types), which means you will lose the entire stake put up.
          </TextMedium>
        </>
      }
    />
  )
}
