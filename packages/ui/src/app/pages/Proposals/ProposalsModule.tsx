import React from 'react'
import { Route, Switch } from 'react-router'

import { ProposalsRoutes } from '@/proposals/constants/routes'

import { PastProposals } from './PastProposals'
import { ProposalPreview } from './ProposalPreview'
import { Proposals } from './Proposals'

export const ProposalsModule = () => {
  return (
    <Switch>
      <Route exact path={ProposalsRoutes.current} component={Proposals} />
      <Route exact path={ProposalsRoutes.past} component={PastProposals} />
      <Route exact path={ProposalsRoutes.myproposals} />
      <Route exact path={`${ProposalsRoutes.preview}/:id/vote/:voteId`} component={ProposalPreview} />
      <Route exact path={`${ProposalsRoutes.preview}/:id/post/:postId`} component={ProposalPreview} />
      <Route exact path={`${ProposalsRoutes.preview}/:id`} component={ProposalPreview} />
    </Switch>
  )
}
