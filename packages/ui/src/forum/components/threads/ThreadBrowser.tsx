import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { Label } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'

import { ThreadItem, ThreadItemWrapper, ThreadItemContentProps } from './ThreadItem'
import { ThreadsLayoutSpacing } from './ThreadsLayout'

export interface ThreadBrowserProps {
  label: string
}

export const ThreadBrowser = ({ label }: ThreadBrowserProps) => {
  const items: ThreadItemContentProps[] = [
    {
      title: 'Title',
      date: '15 min',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quos fugit aut inventore rem dolores nemo, accusantium corporis quae ad beatae corrupti ex repellat. Atque exercitationem dicta ex aliquam sequi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quos fugit aut inventore rem dolores nemo, accusantium corporis quae ad beatae corrupti ex repellat. Atque exercitationem dicta ex aliquam sequi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quos fugit aut inventore rem dolores nemo, accusantium corporis quae ad beatae corrupti ex repellat. Atque exercitationem dicta ex aliquam sequi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quos fugit aut inventore rem dolores nemo, accusantium corporis quae ad beatae corrupti ex repellat. Atque exercitationem dicta ex aliquam sequi?',
      badges: [{ badge: 'Badge 1' }, { badge: 'Badge 2' }],
      answers: [{ answer: 'answer 1' }, { answer: 'answer 2' }, { answer: 'answer 3' }],
    },
    {
      title: 'Title',
      date: '15 min',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quos fugit aut inventore rem dolores nemo, accusantium corporis quae ad beatae corrupti ex repellat. Atque exercitationem dicta ex aliquam sequi?',
      badges: [{ badge: 'Badge 1' }, { badge: 'Badge 2' }],
      answers: [{ answer: 'answer 1' }, { answer: 'answer 2' }, { answer: 'answer 3' }],
    },
  ]
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    let timeOutId: any
    if (isLoading) {
      timeOutId = setTimeout(() => setLoading(false), 500) as any
    }

    return () => clearTimeout(timeOutId)
  }, [isLoading])
  const onClick = () => {
    setLoading(true)
  }

  return (
    <ThreadBrowserStyles>
      <ThreadBrowserHeader align="center" gap={16}>
        <Label>
          {label} {items.length > 0 && <CountBadge count={items.length} />}
        </Label>
        <ButtonsGroup>
          <ButtonGhost size="small" square onClick={onClick}>
            <Arrow direction="left" />
          </ButtonGhost>
          <ButtonGhost size="small" square onClick={onClick}>
            <Arrow direction="right" />
          </ButtonGhost>
        </ButtonsGroup>
      </ThreadBrowserHeader>
      <ThreadBrowserItems>
        {isLoading || !items || items.length == 0 ? (
          <Loading />
        ) : (
          items.map((item) => <ThreadItem {...item} halfSize={items.length > 1} />)
        )}
      </ThreadBrowserItems>
    </ThreadBrowserStyles>
  )
}

const ThreadBrowserStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - (${ThreadsLayoutSpacing} / 2));
  flex-shrink: 0;
  flex-grow: 1;
  max-width: 100%;
  max-height: 472px;
  padding: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  overflow: hidden;
  transition: ${Transitions.all};

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
    ${ThreadItemWrapper} {
      &:before {
        background-color: ${Colors.Blue[100]};
      }
    }
  }
`

const ThreadBrowserHeader = styled(ColumnGapBlock)`
  justify-content: space-between;
  width: 100%;
`

const ThreadBrowserItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
`
