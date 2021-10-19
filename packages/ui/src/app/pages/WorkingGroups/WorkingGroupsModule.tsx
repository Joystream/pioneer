import React from 'react'
import { Route, Switch } from 'react-router'

import { WorkingGroupsRoutes } from '@/working-groups/constants'

import { MyApplications } from './MyApplications'
import { MyRole } from './MyRoles/MyRole'
import { MyRoles } from './MyRoles/MyRoles'
import { UpcomingOpening } from './UpcomingOpening'
import { WorkingGroup } from './WorkingGroup'
import { WorkingGroups } from './WorkingGroups'
import { WorkingGroupOpening } from './WorkingGroupsOpening'
import { WorkingGroupsOpenings } from './WorkingGroupsOpenings'

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
