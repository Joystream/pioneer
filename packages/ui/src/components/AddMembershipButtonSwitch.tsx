import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '../components/typography/Text'
import { BorderRad, Colors, Transitions } from '../constants/styles'
import { AddMembershipModal } from '../modals/AddMembershipModal'
import { MyProfileIcon } from './page/Sidebar/LinksIcons/MyProfileIcon'

export const AddMembershipButtonSwitch = () => {
  const [isCreateOpen, setCreateOpen] = useState(false)

  return (
    <>
      <AddMemberships onClick={() => setCreateOpen(true)}>
        <AddMembershipImage>
          <MyProfileIcon />
        </AddMembershipImage>
        <AddMembershipTitle>New Member</AddMembershipTitle>
        <AddMembershipText size={3}>Create a New Membership</AddMembershipText>
      </AddMemberships>
      {isCreateOpen && <AddMembershipModal onClose={() => setCreateOpen(false)} />}
    </>
  )
}

const AddMembershipImage = styled.span`
  display: flex;
  grid-area: createicon;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[700]};
  color: ${Colors.Black[75]};
  transition: ${Transitions.all};

  .nav-icon {
    .whitePart {
      transition: ${Transitions.all};
    }
    .primaryPart {
      fill: ${Colors.Blue[500]};
      transition: ${Transitions.all};
    }
  }
`

const AddMembershipTitle = styled.h6`
  grid-area: createtitle;
  color: ${Colors.Black[75]};
  transition: ${Transitions.all};
`

const AddMembershipText = styled(Text)`
  grid-area: createtext;
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};
`

const AddMemberships = styled.button`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 20px 18px;
  grid-template-areas:
    'createicon createtitle'
    'createicon createtext';
  grid-column-gap: 8px;
  grid-row-gap: 4px;
  justify-content: start;
  justify-items: start;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  cursor: pointer;

  &:hover {
    background-color: ${Colors.Black[600]};

    ${AddMembershipImage} {
      background-color: ${Colors.Black[500]};
      color: ${Colors.Black[50]};

      .nav-icon {
        .primaryPart {
          fill: ${Colors.Black[50]};
        }
        .whitePart {
          fill: ${Colors.Blue[500]};
        }
      }
    }
    ${AddMembershipTitle} {
      color: ${Colors.Black[50]};
    }
    ${AddMembershipText} {
      color: ${Colors.Black[300]};
    }
  }
`
