import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ProfileRoutes } from '@/app/constants/routes'
import { MyAccounts } from '@/app/pages/Profile/MyAccounts'
import { MyMemberships } from '@/app/pages/Profile/MyMemberships'

export const ProfileModule = () => {
  return (
    <Switch>
      <Route path={ProfileRoutes.lock} component={MyAccounts} />
      <Route path={ProfileRoutes.account} component={MyAccounts} />
      <Route exact path={ProfileRoutes.accounts} component={MyAccounts} />
      <Route exact path={ProfileRoutes.memberships} component={MyMemberships} />
      <Redirect from="/profile/*" to={ProfileRoutes.profile} />
    </Switch>
  )
}
