export * from './App'
export { WaitForAPI } from '@/app/components/WaitForAPI'

const glob = window as any
glob.Commands = {
  ignoreValidation: (enabled: boolean) => {
    sessionStorage.setItem('IgnoreValidation', String(enabled))
  },
}
