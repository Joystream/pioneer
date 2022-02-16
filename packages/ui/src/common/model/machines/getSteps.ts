import { Interpreter, State, StateMachine, StateNode } from 'xstate'

export interface Step {
  title: string
  type: 'past' | 'active' | 'next' | 'hideNumber'
  isBaby?: boolean
  onClick?: () => void
  id?: string
}

const getActiveNodeOrder = (state: State<any>) => (activeId: number, stateNode: StateNode) => {
  if (state?.matches(stateNode.path.join('.'))) {
    return stateNode.order
  }

  return activeId
}

const isStepNode = (stateNode: StateNode, state: State<any>) => {
  if (!stateNode || !stateNode?.meta || !stateNode.meta?.isStep) {
    return false
  }

  return stateNode.meta?.cond ? stateNode.meta.cond(state.context) : true
}

const getParentStateNode = (node: StateNode): StateNode | null => {
  if (node.parent?.parent?.meta?.isStep) {
    return node.parent?.parent
  }

  if (node.parent?.meta?.isStep) {
    return node.parent
  }

  return null
}

const getStepsFromMachineAndState = (machine: StateMachine<any, any, any>, state: State<any>): Step[] => {
  const stateNodes = machine.stateIds.map((id) => machine.getStateNodeById(id))
  const activeNodeOrder = stateNodes.reduce(getActiveNodeOrder(state), -1)

  const idToStep = new Map()

  const steps: (Step | undefined)[] = stateNodes.map((stateNode) => {
    const parentStepNode = getParentStateNode(stateNode)
    const isActive = stateNode.order === activeNodeOrder

    if (isActive && parentStepNode) {
      const step = idToStep.get(parentStepNode.id)

      if (step) {
        step.type = 'active'
      }
    }

    if (!isStepNode(stateNode, state)) {
      return undefined
    }

    const isNext = stateNode.order > activeNodeOrder

    const step: Step = {
      title: stateNode?.meta?.stepTitle ?? '',
      type: isActive ? 'active' : isNext ? 'next' : 'past',
    }

    if (parentStepNode) {
      step.isBaby = true
    }

    idToStep.set(stateNode.id, step)

    return step
  })

  return steps.filter((step) => !!step) as Step[]
}

export const getSteps = (service: Interpreter<any, any, any, any>): Step[] => {
  return getStepsFromMachineAndState(service.machine, service.state)
}
