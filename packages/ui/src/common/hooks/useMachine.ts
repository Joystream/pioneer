import { useMachine as baseUseMachine } from '@xstate/react'
import { MaybeLazy } from '@xstate/react/lib/types'
import { UseMachineOptions } from '@xstate/react/lib/useMachine'
import { useEffect } from 'react'
import { EventObject, InterpreterOptions, MachineOptions, StateMachine, Typestate } from 'xstate'

import { useModal } from '@/common/hooks/useModal'

export const useMachine = <
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any
    context: TContext
  }
>(
  getMachine: MaybeLazy<StateMachine<TContext, any, TEvent, TTypestate>>,
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>>
) => {
  const { setMachineState } = useModal()
  const state = baseUseMachine(getMachine, options)

  useEffect(() => {
    if (state) {
      setMachineState?.(state)
    }
  }, [state[0].value])

  return state
}
