import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`

const SpinnerMini = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`

export default SpinnerMini
