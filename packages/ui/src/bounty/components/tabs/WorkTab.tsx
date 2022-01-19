import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { BountyWorkListItem } from '@/bounty/components/BountyWorkListItem/BountyWorkListItem'
import { BountyRoutes } from '@/bounty/constants'
import { useBountyWorks } from '@/bounty/hooks/useBountyWorks'
import { InputComponent, InputText } from '@/common/components/forms'
import { CrossIcon } from '@/common/components/icons'
import { List } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { TextExtraSmall } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { Colors } from '@/common/constants'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'

interface Props {
  bountyId: string
  wasSearched?: boolean
  setWasSearched?(value: boolean): void
}

export const WorkTab = ({ bountyId, wasSearched, setWasSearched }: Props) => {
  const { t } = useTranslation('bounty')
  const [entrantSearch, setEntrantSearch] = useState<string>('')
  const { works, isLoading, pagination } = useBountyWorks({ bountyId, perPage: 5, workerHandle: entrantSearch })
  const query = useRouteQuery()
  const { replace } = useHistory()
  const workId = query.get('work')

  useEffect(() => {
    if (wasSearched && workId) {
      replace(bountyId)

      setWasSearched?.(false)
    }

    if (workId && works.length && !wasSearched) {
      const el = document.getElementById(workId)
      el?.scrollIntoView({ behavior: 'smooth' })
      setWasSearched?.(true)
    }
  }, [workId, works.length])

  const workOnClick = useCallback(
    (workId: string) => {
      navigator.clipboard.writeText(
        `${window.location.origin}/#${generatePath(BountyRoutes.bounty, {
          id: bountyId,
        })}?tab=Works&work=work${workId}`
      )
    },
    [bountyId]
  )

  const worksComponents = useMemo(() => {
    if (works.length) {
      return (
        <>
          <StyledList as="div">
            {works.map((work) => (
              <BountyWorkListItem
                searched={workId === `work${work.id}`}
                id={`work${work.id}`}
                key={work.id}
                entrant={work.worker}
                inBlock={work.inBlock}
                title={work.title}
                description={work.description}
                onClick={() => workOnClick(work.id)}
              />
            ))}
          </StyledList>
          <Pagination {...pagination} />
        </>
      )
    }

    return <NotFoundText>{entrantSearch ? 'Nothing found' : t('workTab.noWorks')}</NotFoundText>
  }, [works, t])

  return (
    <RowGapBlock gap={4}>
      {(!!works?.length || entrantSearch) && (
        <FilterContainer>
          {entrantSearch && (
            <ResetFilter light onClick={() => setEntrantSearch('')}>
              <CrossIcon />
              Clear all filters
            </ResetFilter>
          )}
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
  position: relative;
  margin-top: 15px;
`

const ResetFilter = styled(TextExtraSmall)`
  display: flex;
  align-items: center;
  position: absolute;
  top: -15px;
  right: 0;
  cursor: pointer;

  svg {
    width: 11px;
    height: 11px;
  }
`

const StyledList = styled(List)`
  margin-top: 40px;
`
