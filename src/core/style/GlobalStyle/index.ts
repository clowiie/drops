import { createGlobalStyle, css } from 'styled-components'

const root = css`
  body {
    margin: 0;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const globalStyle = createGlobalStyle`
    ${root}
`

export default globalStyle
