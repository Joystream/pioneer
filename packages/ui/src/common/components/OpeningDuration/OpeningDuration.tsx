import * as React from 'react'

export interface OpeningDurationProps {}

const OpeningDuration: React.FC<OpeningDurationProps> = React.memo(() => {
  return (
    <div>
      <p>OpeningDuration</p>
    </div>
  )
})

OpeningDuration.displayName = 'OpeningDuration'

export default OpeningDuration
