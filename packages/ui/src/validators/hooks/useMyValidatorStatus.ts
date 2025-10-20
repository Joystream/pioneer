import { useEffect, useState } from 'react'
import { useApi } from '@/api/hooks/useApi'
import { Address } from '@/common/types'

export interface ValidatorStatus {
  isValidator: boolean
  hasSessionKeys: boolean
}

export const useMyValidatorStatus = (addresses: Address[]) => {
  const { api } = useApi()
  const [validatorStatuses, setValidatorStatuses] = useState<Map<Address, ValidatorStatus>>(new Map())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkValidatorStatus = async () => {
      if (!api || !addresses.length) {
        setValidatorStatuses(new Map())
        setIsLoading(false)
        return
      }

      try {
        const statuses = new Map<Address, ValidatorStatus>()

        // Get list of all validators (stash accounts)
        const validatorEntries = await new Promise<any[]>((resolve, reject) => {
          const subscription = api.query.staking.validators.entries().subscribe({
            next: (entries) => {
              subscription.unsubscribe()
              resolve(entries)
            },
            error: (error) => {
              subscription.unsubscribe()
              reject(error)
            },
          })
        })

        const validatorStashAccounts = validatorEntries.map(([key]) => key.args[0].toString())

        // Get controller accounts for these addresses
        const bondedControllers = await Promise.all(
          addresses.map(async (address) => {
            const bonded = await new Promise<any>((resolve, reject) => {
              const subscription = api.query.staking.bonded(address).subscribe({
                next: (bonded) => {
                  subscription.unsubscribe()
                  resolve(bonded)
                },
                error: (error) => {
                  subscription.unsubscribe()
                  reject(error)
                },
              })
            })

            return {
              stash: address,
              controller: bonded.isSome ? bonded.unwrap().toString() : null,
            }
          })
        )

        // Check if any address is a validator (as stash or controller)
        for (const address of addresses) {
          const isValidatorStash = validatorStashAccounts.includes(address)

          // Check if this address is a controller for any validator stash
          const asControllerForStash = bondedControllers.find((b) => b.controller === address)?.stash
          const isControllerForValidator = asControllerForStash
            ? validatorStashAccounts.includes(asControllerForStash)
            : false

          const isValidator = isValidatorStash || isControllerForValidator

          // Check if has session keys set
          let hasSessionKeys = false
          if (isValidator) {
            try {
              const stashToCheck = isValidatorStash ? address : asControllerForStash!
              const sessionKeys = await new Promise<any>((resolve, reject) => {
                const subscription = api.query.session.nextKeys(stashToCheck).subscribe({
                  next: (keys) => {
                    subscription.unsubscribe()
                    resolve(keys)
                  },
                  error: (error) => {
                    subscription.unsubscribe()
                    reject(error)
                  },
                })
              })
              hasSessionKeys = sessionKeys.isSome
            } catch (error) {
              console.warn(`Failed to check session keys for ${address}:`, error)
            }
          }

          statuses.set(address, {
            isValidator,
            hasSessionKeys,
          })
        }

        setValidatorStatuses(statuses)
      } catch (error) {
        console.error('Failed to check validator status:', error)
        setValidatorStatuses(new Map())
      } finally {
        setIsLoading(false)
      }
    }

    checkValidatorStatus()
  }, [api, addresses.join(',')])

  return {
    validatorStatuses,
    isLoading,
  }
}
