import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { BountyWorkListItem } from '@/bounty/components/BountyWorkListItem/BountyWorkListItem'
import { useBountyWorks } from '@/bounty/hooks/useBountyWorks'
import { InputComponent, InputText } from '@/common/components/forms'
import { List } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { TextExtraSmall } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { Colors } from '@/common/constants'
import { randomBlock } from '@/mocks/helpers/randomBlock'

interface Props {
  bountyId: string
}

const randomizedBlock = randomBlock()

export const WorkTab = ({ bountyId }: Props) => {
  const { t } = useTranslation('bounty')
  const [entrant, setEntrant] = useState<string>('')
  const { works, isLoading, pagination } = useBountyWorks({ bountyId, perPage: 2 })

  const worksComponents = useMemo(() => {
    if (works.length) {
      return (
        <>
          <StyledList as="div">
            {works.map((work) => (
              <BountyWorkListItem
                key={work.id}
                entrant={work.worker}
                inBlock={randomizedBlock}
                title={work.title}
                description={work.description}
                link=""
              />
            ))}
          </StyledList>
          <Pagination {...pagination} />
        </>
      )
    }

    return <NotFoundText>No works</NotFoundText>
  }, [works])

  return (
    <RowGapBlock gap={4}>
      <FilterContainer>
        <div>
          <TextExtraSmall>{t('workTab.filter.label')}</TextExtraSmall>
          <InputComponent inputSize="xs" tight id="field-entrant">
            <InputText
              id="field-entrant"
              value={entrant}
              onChange={(e) => setEntrant(e.target.value)}
              placeholder={t('workTab.filter.placeholder')}
            />
          </InputComponent>
        </div>
      </FilterContainer>
      {isLoading ? <Loading /> : worksComponents}
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
