import React from 'react'

import SwapPlate from 'modules/swap/components/SwapPlate'

const SwapPage = () => (
  <div className="flex flex-col justify-center items-center pt-14">
    <div className="mb-8">
      <span className="text-2xl font-semibold text-center">Swap</span>
    </div>

    <SwapPlate />
  </div>
)

export default SwapPage
