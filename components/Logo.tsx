'use client'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CSSProperties } from 'react'

function Logo({
  style,
  link = false,
}: {
  link?: boolean
  style?: CSSProperties
}) {
  const router = useRouter()

  return (
    <StyledLogo
      link={link}
      style={style}
      onClick={() => {
        if (link) router.push('/')
      }}
    >
      <Image src="/logo.png" alt="Hotel Logo" width="150" height="75" />
    </StyledLogo>
  )
}

export default Logo

const StyledLogo = styled.div`
  &:hover {
    cursor: ${(props: { link: boolean }) => (props.link ? 'pointer' : '')};
  }
`
