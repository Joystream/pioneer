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

  let lastParentIndex = -1
  let setParentActive = -1

  const steps: Step[] = stateNodes
    .filter((stateNode) => !!stateNode?.meta?.isStep)
    .filter((stateNode) => {
      if (!stateNode || !stateNode?.meta || !stateNode.meta?.isStep) {
        return false
      }

      return stateNode.meta?.cond ? stateNode.meta.cond(state.context) : true
    })
    .map((stateNode, index) => {
      const isBabyStep = stateNode.parent?.meta?.isStep

      if (!isBabyStep) {
        lastParentIndex = index
      }

      const isActive = stateNode.order === activeNodeOrder

      if (isActive && isBabyStep) {
        setParentActive = lastParentIndex
      }
      return {
        title: stateNode?.meta?.stepTitle ?? '',
        type: isActive ? 'active' : stateNode.order < activeNodeOrder ? 'past' : 'next',
        ...(isBabyStep ? { isBaby: true } : undefined),
      }
    })

  if (setParentActive !== -1) {
    steps[setParentActive].type = 'active'
  }

  return steps
}

export const getSteps = (service: Interpreter<any, any, any, any>): Step[] => {
  return getStepsFromMachineAndState(service.machine, service.state)
}
