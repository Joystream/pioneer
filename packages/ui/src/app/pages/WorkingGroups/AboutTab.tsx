import React from 'react'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { Label } from '../../../common/components/typography'

export function AboutTab() {
  return (
    <ContentWithSidepanel>
      <MainPanel>
        <h4>Welcome</h4>
        <div>
          Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to
          Joystream are formatted correctly and comprehensively monitored and moderated.
        </div>
        <h4>Status</h4>
        <div>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </div>
        <h4>About</h4>
        <div>
          There are critical platform assets that do not live on the blockchain, such as images and content media. The
          integrity of these assets is secured by the chain, but a separate set of storage and distribution nodes
          enables uploading and downloading of such data. The storage provider is involved this activity, specifically
          by storing large quantities of data.
        </div>
      </MainPanel>
      <SidePanel>
        <Label>Leader</Label>
        <Label>Workers</Label>
      </SidePanel>
    </ContentWithSidepanel>
  )
}
