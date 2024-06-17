import { last } from 'lodash'
import React, { Fragment, ReactNode, useReducer, useRef } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonPrimary } from '../buttons'
import { CrossIcon, PlusIcon } from '../icons'

type FieldProps<Name extends string> = { name: `${Name}.${number}`; id?: string; index: number }
type Props<Name extends string> = {
  render: (props: FieldProps<Name>) => ReactNode
  unmount?: (props: FieldProps<Name>) => void
  id?: string
  name?: Name
  initialSize?: number
  addLabel?: string
  align?: 'start' | 'end'
  inputWidth?: 's' | 'xs' | 'full'
}

type State = { ids: number[]; next: number }
type Action = { type: 'add' } | { type: 'remove'; index: number }
const init = (initialSize: number): State => ({
  ids: Array.from({ length: initialSize }, (_, i) => i),
  next: initialSize,
})
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add': {
      const current = state.next
      return { ids: [...state.ids, current], next: current + 1 }
    }
    case 'remove':
      return { ids: state.ids.filter((index) => index !== action.index), next: state.next }
  }
}

export function FieldList<Key extends string>({
  render,
  unmount,
  id,
  name = 'field' as Key,
  initialSize = 0,
  addLabel,
  ...styleProps
}: Props<Key>) {
  const [{ ids }, dispatch] = useReducer(reducer, initialSize, init)

  const container = useRef<HTMLDivElement>(null)
  const addField = () => {
    dispatch({ type: 'add' })
    setTimeout(() => {
      const inputs = container.current?.querySelectorAll('input')
      last(inputs)?.focus()
    })
  }

  return (
    <Container {...styleProps} ref={container} id={id}>
      {ids.map((index) => {
        const fieldProps = { name: `${name}.${index}` as const, id: `${id}-${index}`, index }
        return (
          <Fragment key={index}>
            {render(fieldProps)}
            <ButtonGhost
              square
              size="large"
              onClick={() => {
                dispatch({ type: 'remove', index })
                unmount?.(fieldProps)
              }}
              id={`${fieldProps.id}-remove`}
              className="remove-button"
            >
              <CrossIcon />
            </ButtonGhost>
          </Fragment>
        )
      })}

      <ButtonPrimary size="small" className="add-button" onClick={addField}>
        <PlusIcon /> {addLabel}
      </ButtonPrimary>
    </Container>
  )
}

const Container = styled.div<Pick<Props<string>, 'align' | 'inputWidth'>>`
  display: grid;
  grid-template-columns: 1fr 50px;
  width: 100%;
  width: ${({ inputWidth }) => {
    switch (inputWidth) {
      case 's':
        return '320px'
      case 'xs':
        return '200px'
      default:
        return '100%'
    }
  }};
  gap: 8px;
  align-items: center;

  & > :last-child {
    grid-column: 1 / -1;
    justify-self: ${({ align = 'start' }) => align};
  }
`
