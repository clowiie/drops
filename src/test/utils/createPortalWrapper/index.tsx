import { FC } from 'react'

export default function createPortalWrapper(): FC {
  return ({ children }) => (
    <>
      <div id="root" />
      <div>{children}</div>
    </>
  )
}
