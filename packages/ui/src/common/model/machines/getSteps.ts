import { Interpreter, State, StateMachine, StateNode } from 'xstate'

export interface Step {
  title: string
  type: 'past' | 'active' | 'next'
  isBaby?: boolean
}

const getActiveNodeOrder = (state: State<any>) => (activeId: number, stateNode: StateNode) => {
  if (state.matches(stateNode.path.join('.'))) {
    return stateNode.order
  }

  return activeId
}

export const getStepsFromMachineAndState = (machine: StateMachine<any, any, any>, state: State<any>): Step[] => {
  const stateNodes = machine.stateIds.map((id) => machine.getStateNodeById(id))
  const activeNodeOrder = stateNodes.reduce(getActiveNodeOrder(state), -1)

  return stateNodes
    .filter((stateNode) => !!stateNode?.meta?.isStep)
    .map((stateNode) => {
      return {
        title: stateNode?.meta?.stepTitle ?? '',
        type: stateNode.order === activeNodeOrder ? 'active' : stateNode.order < activeNodeOrder ? 'past' : 'next',
        ...(stateNode.parent?.meta?.isStep ? { isBaby: true } : undefined),
      }
    })
}

export const getSteps = (service: Interpreter<any, any, any, any>): Step[] => {
  return getStepsFromMachineAndState(service.machine, service.state)
}
