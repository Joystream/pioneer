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

interface Props {
  bountyId: string
}

export const WorkTab = ({ bountyId }: Props) => {
  const { t } = useTranslation('bounty')
  const [entrantSearch, setEntrantSearch] = useState<string>('')
  const { works, isLoading, pagination } = useBountyWorks({ bountyId, perPage: 2, workerHandle: entrantSearch })

  const worksComponents = useMemo(() => {
    if (works.length) {
      return (
        <>
          <StyledList as="div">
            {works.map((work) => (
              <BountyWorkListItem
                key={work.id}
                entrant={work.worker}
                inBlock={work.inBlock}
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

    return <NotFoundText>{t('workTab.noWorks')}</NotFoundText>
  }, [works, t])

  return (
    <RowGapBlock gap={4}>
      {!!works?.length && (
        <FilterContainer>
          <div>
            <TextExtraSmall bold>{t('workTab.filter.label')}</TextExtraSmall>
            <InputComponent inputSize="xs" tight id="field-entrant">
              <InputText
                id="field-entrant"
                value={entrantSearch}
                onChange={(e) => setEntrantSearch(e.target.value)}
                placeholder={t('workTab.filter.placeholder')}
              />
            </InputComponent>
          </div>
        </FilterContainer>
      )}
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
    text-transform: uppercase;
    padding-bottom: 5px;
  }
`

const StyledList = styled(List)`
  margin-top: 40px;
`
