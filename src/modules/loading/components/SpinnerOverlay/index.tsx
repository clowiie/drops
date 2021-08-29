import React from 'react'

import Spinner from 'modules/loading/components/Spinner'

const SpinnerOverlay = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
    <div className="static bg-white rounded-md outline-none p-2">
      <Spinner />
    </div>
  </div>
)

export default SpinnerOverlay
