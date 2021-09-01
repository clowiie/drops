import { Context, FC } from 'react'

function createContextWrapper<T extends unknown>(WrapperContext: Context<T>, value: T): FC {
  return ({ children }) => <WrapperContext.Provider value={value}>{children}</WrapperContext.Provider>
}

export default createContextWrapper
