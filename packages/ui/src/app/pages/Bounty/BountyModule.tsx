import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import styled from 'styled-components'

import DisabledBounties from '@/app/assets/images/DisabledBounties.png'
import { BountyRoutes } from '@/bounty/constants'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export const BountyModule = () => {
  return (
    <Switch>
      {/*<Route exact path={BountyRoutes.currentBounties} component={BountiesCurrent} />*/}
      {/*<Route exact path={BountyRoutes.pastBounties} component={BountiesPast} />*/}
      {/*<Route exact path={BountyRoutes.myBounties} component={BountiesMyBounties} />*/}
      {/*<Route exact path={BountyRoutes.myContributions} component={BountiesMyContributions} />*/}
      {/*<Route exact path={BountyRoutes.myEntries} component={BountiesMyEntries} />*/}
      {/*<Route exact path={BountyRoutes.bountyTags} component={BountiesTags} />*/}
      {/*<Route exact path={BountyRoutes.bounty} component={Bounty} />*/}
      {/*<Redirect exact path={BountyRoutes.bounties} to={BountyRoutes.currentBounties} />*/}
      <Route exact path={BountyRoutes.bounties} component={EmptyPageComponent} />
      <Redirect from="*" to={BountyRoutes.bounties} />
    </Switch>
  )
}

const EmptyPageComponent = () => (
  <EmptyPage>
    <img src={DisabledBounties} alt="Image of bag with coins" />
    <TextExtraHuge value bold>
      Bounties module is coming back soon!
    </TextExtraHuge>
    <TextMedium value>
      We are working on the necessary upgrades for the much loved Bounties module to be released shortly! Stay Tuned!
    </TextMedium>
  </EmptyPage>
)

const EmptyPage = styled.div`
  background-color: ${Colors.Black[700]};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  img {
    object-fit: contain;
    width: 45%;
  }

  ${TextExtraHuge} {
    font-size: 32px;
    margin-top: 40px;
    color: #fff;
  }

  ${TextMedium} {
    color: ${Colors.Black[500]};
  }
`
