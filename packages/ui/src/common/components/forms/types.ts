export interface ControlProps<Value, Update = Value> {
  value: Value
  onChange: (value: Update) => void
}
