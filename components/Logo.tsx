'use client'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function Logo() {
  const router = useRouter()
  return (
    <StyledImage onClick={() => router.push('/')}>
      <Image src="/logo.png" alt="Hotel Logo" width="150" height="75"></Image>
    </StyledImage>
  )
}

const StyledImage = styled.div`
  &:hover {
    cursor: pointer;
  }
`

export default Logo
