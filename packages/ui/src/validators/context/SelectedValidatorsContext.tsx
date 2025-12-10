import React, { createContext, useContext, useState, ReactNode } from 'react'

import { ValidatorWithDetails } from '../types'

interface SelectedValidatorsContextType {
  selectedValidators: ValidatorWithDetails[]
  isSelected: (validator: ValidatorWithDetails) => boolean
  toggleSelection: (validator: ValidatorWithDetails) => void
  clearSelection: () => void
  maxSelection: number
}

const SelectedValidatorsContext = createContext<SelectedValidatorsContextType | undefined>(undefined)

interface SelectedValidatorsProviderProps {
  children: ReactNode
  maxSelection?: number
}

export const SelectedValidatorsProvider = ({ children, maxSelection = 16 }: SelectedValidatorsProviderProps) => {
  const [selectedValidators, setSelectedValidators] = useState<ValidatorWithDetails[]>([])

  const isSelected = (validator: ValidatorWithDetails) => {
    return selectedValidators.some((selected) => selected.stashAccount === validator.stashAccount)
  }

  const toggleSelection = (validator: ValidatorWithDetails) => {
    setSelectedValidators((prev) => {
      const isCurrentlySelected = prev.some((selected) => selected.stashAccount === validator.stashAccount)

      if (isCurrentlySelected) {
        // Remove from selection
        return prev.filter((selected) => selected.stashAccount !== validator.stashAccount)
      } else {
        // Add to selection if under max limit
        if (prev.length < maxSelection) {
          return [...prev, validator]
        }
        return prev
      }
    })
  }

  const clearSelection = () => {
    setSelectedValidators([])
  }

  return (
    <SelectedValidatorsContext.Provider
      value={{
        selectedValidators,
        isSelected,
        toggleSelection,
        clearSelection,
        maxSelection,
      }}
    >
      {children}
    </SelectedValidatorsContext.Provider>
  )
}

export const useSelectedValidators = () => {
  const context = useContext(SelectedValidatorsContext)
  if (context === undefined) {
    throw new Error('useSelectedValidators must be used within a SelectedValidatorsProvider')
  }
  return context
}
