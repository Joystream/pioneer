import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { List, ListItem } from '../../common/components/List'
import { TokenValue } from '../../common/components/typography'
import { WorkingGroupApplication } from '../types/WorkingGroupApplication'

import { openingTitle } from './helpers'

export const ApplicationsList = ({ applications }: { applications: WorkingGroupApplication[] | undefined }) => (
  <List>
    {applications?.map((application) => (
      <ListItem key={application.id}>
        <ApplicationListItem application={application} />
      </ListItem>
    ))}
  </List>
)

const ApplicationListItem = ({ application }: { application: WorkingGroupApplication }) => (
  <OpeningWrap>
    <div>id: {application.id}</div>
    <h4>{openingTitle(application)}</h4>
    <div>
      <h6>6 days 23 minutes</h6>
      Time left
    </div>
    <div>
      <TokenValue value={application.opening?.reward} />
      <br />
      Reward per block
    </div>
    <div>{/*application.opening.applicants.current} / {application.opening.applicants.total*/} Applications</div>
    <div>
      <TokenValue value={new BN(100)} />
      <br />
      Staked
    </div>
    <div>
      <h6>No</h6>
      Hired
    </div>
  </OpeningWrap>
)

const OpeningWrap = styled.div`
  grid-template-columns: 1fr 1fr 16px;
  grid-column-gap: 24px;
  padding: 16px;
`
