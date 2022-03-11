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

export interface UseModal<Data> {
  modal: string | null
  modalData: Data
  showModal: <Call extends AnyModalCall>(call: Call) => void
  hideModal: () => void
}
