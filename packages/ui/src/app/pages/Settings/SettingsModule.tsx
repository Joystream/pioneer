import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { SettingsRoutes } from './routes'
import { SettingsNetworkTab } from './SettingsNetworkTab'
import { SettingsNotificationsTab } from './SettingsNotificationsTab'

export const SettingsModule = () => {
  return (
    <Switch>
      <Route path={SettingsRoutes.settings} exact component={SettingsNetworkTab} />
      <Route path={SettingsRoutes.notifications} exact component={SettingsNotificationsTab} />
      <Redirect from={`${SettingsRoutes.settings}/*`} to={SettingsRoutes.settings} />
    </Switch>
  )
}
