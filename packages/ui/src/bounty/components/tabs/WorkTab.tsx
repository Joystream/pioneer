import React, { useState } from 'react'
import styled from 'styled-components'

import { BountyWorkListItem } from '@/bounty/components/BountyWorkListItem/BountyWorkListItem'
import { InputComponent, InputText } from '@/common/components/forms'
import { List } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { TextExtraSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { Member } from '@/memberships/types'
import members from '@/mocks/data/raw/members.json'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export const WorkTab = () => {
  const [entrant, setEntrant] = useState<string>('')

  return (
    <RowGapBlock gap={4}>
      <FilterContainer>
        <div>
          <TextExtraSmall>ENTRANT</TextExtraSmall>
          <InputComponent inputSize="xs" tight id="field-entrant">
            <InputText
              id="field-entrant"
              value={entrant}
              onChange={(e) => setEntrant(e.target.value)}
              placeholder="Filter entrant"
            />
          </InputComponent>
        </div>
      </FilterContainer>
      <StyledList as="div">
        <BountyWorkListItem
          entrant={(members[0] as unknown) as Member}
          inBlock={randomBlock()}
          title="Title"
          description="Description"
          link="https://www.google.com"
        />
        <BountyWorkListItem
          entrant={(members[0] as unknown) as Member}
          inBlock={randomBlock()}
          title="Title"
          description="Description"
          link="https://www.google.com"
        />
        <BountyWorkListItem
          entrant={(members[0] as unknown) as Member}
          inBlock={randomBlock()}
          title="Title"
          description="Description"
          link="https://www.google.com"
          withdrawn
        />
        <BountyWorkListItem
          entrant={(members[0] as unknown) as Member}
          inBlock={randomBlock()}
          title="Title"
          description="Description"
          link="https://www.google.com"
        />
        <BountyWorkListItem
          entrant={(members[0] as unknown) as Member}
          inBlock={randomBlock()}
          title="Title"
          description="Description"
          link="https://www.google.com"
        />
      </StyledList>
      <Pagination handlePageChange={() => undefined} page={1} pageCount={3} />
    </RowGapBlock>
  )
}

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${Colors.Black[50]};
  height: 68px;
  ${TextExtraSmall} {
    color: ${Colors.Black[400]};
  }
`

const StyledList = styled(List)`
  margin-top: 40px;
`
