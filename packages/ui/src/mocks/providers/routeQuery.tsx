import React, { FC, createContext, useContext, useMemo } from 'react'

export const useRouteQuery = () => {
  const contextValue = useContext(MockRouteQueryContext)
  return useMemo(() => {
    const params = new URLSearchParams()
    if (contextValue) {
      Object.entries(contextValue).forEach(([key, value]) => {
        params.set(key, value)
      })
    }
    return params
  }, [contextValue])
}

export type MockRouteQueryProps = {
  routeQuery?: Record<string, string>
}

const MockRouteQueryContext = createContext<MockRouteQueryProps['routeQuery']>({})

export const MockRouteQueryProvider: FC<MockRouteQueryProps> = ({ children, routeQuery }) => {
  return <MockRouteQueryContext.Provider value={routeQuery}>{children}</MockRouteQueryContext.Provider>
}
