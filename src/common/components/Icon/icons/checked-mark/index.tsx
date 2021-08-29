import React from 'react'

import { IconProps } from 'common/components/Icon/types'

const CheckedMarkIcon = ({ size }: IconProps) => (
  <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.2383 5.30195C20.6413 4.89935 21.2947 4.89935 21.6977 5.30195C22.0698 5.67359 22.0984 6.25837 21.7836 6.6628L21.6977 6.75992L8.74636 19.698C8.37434 20.0697 7.78897 20.0983 7.38413 19.7838L7.2869 19.698L2.30226 14.7185C1.89925 14.3159 1.89925 13.6631 2.30226 13.2605C2.67428 12.8889 3.25966 12.8603 3.6645 13.1748L3.76172 13.2605L8.0166 17.5105L20.2383 5.30195Z"
      fill="currentColor"
    />
  </svg>
)

export default CheckedMarkIcon
