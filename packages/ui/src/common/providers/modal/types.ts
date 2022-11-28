import { EventObject, Interpreter, State, Typestate } from 'xstate'

export interface ModalCall<M> {
  modal: M
}

export interface ModalWithDataCall<M, D> extends ModalCall<M> {
  data: D
}

export interface OptionalDataModalCall<M, D> extends ModalCall<M> {
  data?: D
}

export type AnyModalCall = ModalCall<string> | ModalWithDataCall<string, never> | OptionalDataModalCall<string, never>

type ModalWithDataCallUnion<M, D> = ModalWithDataCall<M, D> | OptionalDataModalCall<M, D>
export type ModalCallData<Call> = Call extends ModalWithDataCallUnion<any, infer Data> ? Data : never
export type ModalName<Call> = Call extends ModalCall<infer Name> ? Name : never

export type UnknownMachine<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any
    context: TContext
  }
> = [
  State<TContext, TEvent, any, TTypestate>,
  Interpreter<TContext, any, TEvent, TTypestate>['send'],
  Interpreter<TContext, any, TEvent, TTypestate>
]

export interface UseModal<Data> {
  modal: string | null
  modalData: Data
  showModal: <Call extends AnyModalCall>(call: Call) => void
  hideModal: () => void
  setMachineState?: <
    TContext,
    TEvent extends EventObject,
    TTypestate extends Typestate<TContext> = {
      value: any
      context: TContext
    }
  >(
    value: UnknownMachine<TContext, TEvent, TTypestate>
  ) => void
  currentModalMachine?: UnknownMachine<unknown, any, any>
  isClosing?: boolean
  returnClosedModal?: () => void
}
