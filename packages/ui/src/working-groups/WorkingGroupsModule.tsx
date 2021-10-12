import React from 'react'
import { Route, Switch } from 'react-router'

import { MyApplications } from '@/app/pages/WorkingGroups/MyApplications'
import { MyRole } from '@/app/pages/WorkingGroups/MyRoles/MyRole'
import { MyRoles } from '@/app/pages/WorkingGroups/MyRoles/MyRoles'
import { UpcomingOpening } from '@/app/pages/WorkingGroups/UpcomingOpening'
import { WorkingGroup } from '@/app/pages/WorkingGroups/WorkingGroup'
import { WorkingGroups } from '@/app/pages/WorkingGroups/WorkingGroups'
import { WorkingGroupOpening } from '@/app/pages/WorkingGroups/WorkingGroupsOpening'
import { WorkingGroupsOpenings } from '@/app/pages/WorkingGroups/WorkingGroupsOpenings'

import { WorkingGroupsRoutes } from './constants'

export const WorkingGroupsModule = () => (
  <Switch>
    <Route exact path={WorkingGroupsRoutes.groups} component={WorkingGroups} />
    <Route exact path={WorkingGroupsRoutes.upcomingOpenings} component={UpcomingOpening} />
    <Route exact path={WorkingGroupsRoutes.openingById} component={WorkingGroupOpening} />
    <Route exact path={WorkingGroupsRoutes.openings} component={WorkingGroupsOpenings} />
    <Route exact path={WorkingGroupsRoutes.myApplications} component={MyApplications} />
    <Route exact path={WorkingGroupsRoutes.myRoles} component={MyRoles} />
    <Route exact path={WorkingGroupsRoutes.myRole} component={MyRole} />
    <Route exact path={WorkingGroupsRoutes.group} component={WorkingGroup} />
  </Switch>
)
