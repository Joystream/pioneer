interface UseMembership {
  count: number
}

export function useMembership(): UseMembership {
  return { count: 0 }
}
