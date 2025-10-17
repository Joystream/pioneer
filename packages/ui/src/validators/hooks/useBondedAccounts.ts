import { useState, useEffect } from 'react'
import { useApi } from '@/api/hooks/useApi'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Address } from '@/common/types'

export interface BondedAccountInfo {
  address: Address
  bondedAmount: string
  hasStakingLock: boolean
}

export const useBondedAccounts = () => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const [bondedAccounts, setBondedAccounts] = useState<BondedAccountInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBondedAccounts = async () => {
      if (!api || !allAccounts.length) {
        setBondedAccounts([])
        setIsLoading(false)
        return
      }

      try {
        const bondedAccountsData: BondedAccountInfo[] = []

        for (const account of allAccounts) {
          try {
            // Query staking.ledger for each account using the proper API pattern
            const ledger = await new Promise<any>((resolve, reject) => {
              const subscription = api.query.staking.ledger(account.address).subscribe({
                next: (ledger) => {
                  subscription.unsubscribe()
                  resolve(ledger)
                },
                error: (error) => {
                  subscription.unsubscribe()
                  reject(error)
                },
              })
            })

            if (ledger.isSome) {
              const ledgerData = ledger.unwrap()
              const bondedAmount = ledgerData.total?.toString() || '0'
              const hasStakingLock = ledgerData.total?.gtn(0) || false

              if (hasStakingLock) {
                bondedAccountsData.push({
                  address: account.address,
                  bondedAmount,
                  hasStakingLock,
                })
              }
            }
          } catch (error) {
            console.warn(`Failed to fetch ledger for account ${account.address}:`, error)
          }
        }

        setBondedAccounts(bondedAccountsData)
      } catch (error) {
        console.error('Failed to fetch bonded accounts:', error)
        setBondedAccounts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchBondedAccounts()
  }, [api, allAccounts])

  return {
    bondedAccounts,
    isLoading,
    hasBondedAccounts: bondedAccounts.length > 0,
  }
}
