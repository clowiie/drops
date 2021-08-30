import { FC } from 'react'

function combineWrappers(...wrappers: Array<FC>): FC {
  return ({ children }) => (
    <>
      {wrappers.reduce(
        (currentWrapper, Wrapper) => (
          <Wrapper>{currentWrapper}</Wrapper>
        ),
        children,
      )}
    </>
  )
}

export default combineWrappers
