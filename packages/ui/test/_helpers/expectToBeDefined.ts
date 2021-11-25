export const expectToBeDefined = <T extends Element>(element: T | null): element is T => {
  expect(element).toBeDefined()
  return true
}
