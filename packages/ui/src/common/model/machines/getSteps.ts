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
const getActiveNode = (state: State<any>) => (activeNode: StateNode | null, stateNode: StateNode) => {
  if (state.matches(stateNode.path.join('.'))) {
    return stateNode
  }

  return activeNode
}

const isTop = (node: StateNode) => {
  const parent = node.parent

  return !parent?.parent
}

export const getStepsFromMachineAndState = (machine: StateMachine<any, any, any>, state: State<any>): Step[] => {
  const stateNodes = machine.stateIds.map((id) => machine.getStateNodeById(id))
  const activeNodeOrder = stateNodes.reduce(getActiveNodeOrder(state), -1)
  const activeNode = stateNodes.reduce(getActiveNode(state), null)

  let lastParentIndex = -1
  let setParentActive = -1
  let hasActive = false

  const summary = []

  summary.push(`StateNodes: ${stateNodes.length}, active=${activeNodeOrder}`)

  const idToStepIndexMap = new Map()

  const steps: Step[] = stateNodes
    .filter((stateNode) => {
      summary.push(`${!isTop(stateNode) ? '  ' : ''} > ${stateNode.order}. : ${stateNode.id}`)
      if (!stateNode || !stateNode?.meta || !stateNode.meta?.isStep) {
        return false
      }

      return stateNode.meta?.cond ? stateNode.meta.cond(state.context) : true
    })
    .map((stateNode, index) => {
      const isBabyStep = stateNode.parent?.parent?.meta?.isStep ?? stateNode.parent?.meta?.isStep

      if (!isBabyStep) {
        lastParentIndex = index
      }

      const isActive = stateNode.order === activeNodeOrder

      if (isActive) {
        hasActive = true
      }

      if (isActive && isBabyStep) {
        setParentActive = lastParentIndex
      }
      const isNext = stateNode.order > activeNodeOrder
      idToStepIndexMap.set(stateNode.id, index)

      return {
        title: stateNode?.meta?.stepTitle ?? '',
        type: isActive ? 'active' : isNext ? 'next' : 'past',
        ...(isBabyStep ? { isBaby: true } : undefined),
      }
    })

  summary.push(`Has active? ${hasActive}`)

  if (!hasActive) {
    if (activeNode?.parent?.meta?.isStep) {
      const step = steps[idToStepIndexMap.get(activeNode?.parent.id)]
      if (step) {
        step.type = 'active'
      }
    }
  }

  if (setParentActive !== -1) {
    steps[setParentActive].type = 'active'
  }

  return steps
}

export const getSteps = (service: Interpreter<any, any, any, any>): Step[] => {
  return getStepsFromMachineAndState(service.machine, service.state)
}
