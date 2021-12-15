import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import { BountyRoutes } from '@/bounty/constants'

import { BountiesCurrent } from './BountiesCurrent'
import { BountiesMyBounties } from './BountiesMyBounties'
import { BountiesMyContributions } from './BountiesMyContributions'
import { BountiesMyEntries } from './BountiesMyEntries'
import { BountiesPast } from './BountiesPast'
import { BountiesTags } from './BountiesTags'
import { Bounty } from './Bounty'

export const BountyModule = () => {
  return (
    <Switch>
      <Route exact path={BountyRoutes.currentBounties} component={BountiesCurrent} />
      <Route exact path={BountyRoutes.pastBounties} component={BountiesPast} />
      <Route exact path={BountyRoutes.myBounties} component={BountiesMyBounties} />
      <Route exact path={BountyRoutes.myContributions} component={BountiesMyContributions} />
      <Route exact path={BountyRoutes.myEntries} component={BountiesMyEntries} />
      <Route exact path={BountyRoutes.bountyTags} component={BountiesTags} />
      <Route exact path={BountyRoutes.bounty} component={Bounty} />
      <Redirect exact path={BountyRoutes.bounties} to={BountyRoutes.currentBounties} />
      <Redirect from="*" to={BountyRoutes.currentBounties} />
    </Switch>
  )
}
