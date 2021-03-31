export interface ModalCall<M> {
  modal: M
}

export interface ModalWithDataCall<M, D> extends ModalCall<M> {
  data: D
}

export type AnyModalCall = ModalCall<string> | ModalWithDataCall<string, never>

export type ModalCallData<Call> = Call extends ModalWithDataCall<any, infer Data> ? Data : never

export interface UseModal<Data> {
  modal: string | null
  modalData: Data
  showModal: <Call extends AnyModalCall>(call: Call) => void
  hideModal: () => void
}
