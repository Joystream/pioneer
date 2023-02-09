export * from './App'
export { WaitForAPI } from '@/app/components/WaitForAPI'

// Define commands
Object.defineProperty(global, 'PIONEER', {
  value: {
    get IgnoreValidation() {
      const enabled = !JSON.parse(sessionStorage.getItem('IgnoreValidation') ?? 'false')
      sessionStorage.setItem('IgnoreValidation', String(enabled))
      return enabled ? 'Form validation is now ignored' : 'Form validation is no longer ignored'
    },
  },
})
