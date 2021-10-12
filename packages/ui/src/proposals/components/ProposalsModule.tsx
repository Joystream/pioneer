import React from 'react'
import { Route, Switch } from 'react-router'

import { PastProposals } from '@/app/pages/Proposals/PastProposals'
import { ProposalPreview } from '@/app/pages/Proposals/ProposalPreview'
import { Proposals } from '@/app/pages/Proposals/Proposals'

import { ProposalsRoutes } from '../constants/routes'

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
