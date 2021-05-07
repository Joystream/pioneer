import { useState, useCallback } from 'react'

export const useCopyToClipboard = () => {
  const [isSuccessfullyCopied, setSuccessfullyCopied] = useState(false)
  const [isCopyFailure, setCopyFailure] = useState(false)

  const copyValue = useCallback((value: string) => {
    try {
      navigator.clipboard.writeText(value)
      setSuccessfullyCopied(true)
    } catch (error) {
      setCopyFailure(true)
    }
  }, [])

  return { isSuccessfullyCopied, isCopyFailure, setCopyFailure, setSuccessfullyCopied, copyValue }
}
