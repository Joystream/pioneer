import React from 'react'
import { ButtonPrimary } from '../../components/buttons/Buttons'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { SideBar } from '../../components/page/SideBar'

function Memberships() {
  return (
    <>
      <h2>You have no active membership</h2>
      <p>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
        velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </p>
      <ButtonPrimary>Create membership</ButtonPrimary>
    </>
  )
}

export function Membership() {
  return (
    <Page>
      <SideBar
        crumbs={[
          { href: '#', text: 'My Profile' },
          { href: '#', text: 'My Mmeberships' },
        ]}
      />
      <PageContent>
        <Memberships />
      </PageContent>
    </Page>
  )
}
