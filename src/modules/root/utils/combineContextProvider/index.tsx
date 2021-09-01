import { ReactNode, FC } from 'react'

function combineContextProvider(wrappers: FC[], children: ReactNode) {
  return wrappers.reduce(
    (currentWrapper, Wrapper) => <Wrapper>{currentWrapper}</Wrapper>,
    children,
  )
}

export default combineContextProvider
