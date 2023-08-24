'use client'
import styled from '@emotion/styled'
import Image from 'next/image'
import { CSSProperties } from 'react'

function Logo({ style }: { style?: CSSProperties }) {
  return (
    <StyledLogo style={style}>
      <Image src="/logo.png" alt="Hotel Logo" width="150" height="75" />
    </StyledLogo>
  )
}

export default Logo

const StyledLogo = styled.div``
