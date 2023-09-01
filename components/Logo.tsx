'use client'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CSSProperties } from 'react'
import ToggleMenu from './ToggleMenu'

function Logo({
  style,
  link = false,
}: {
  link?: boolean
  style?: CSSProperties
}) {
  const router = useRouter()

  return (
    <LogoContainer>
      <StyledLogo
        link={link}
        style={style}
        onClick={() => {
          if (link) router.push('/')
        }}
      >
        <Image
          src="/logo.png"
          alt="Hotel Logo"
          layout="fill"
          objectFit="cover"
        />
      </StyledLogo>
    </LogoContainer>
  )
}

export default Logo

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 15rem;
  height: 100%;
`

const StyledLogo = styled.div`
  left: 2rem;

  @media (max-width: 1000px) {
    position: absolute;
    top: 0.8rem;
    left: 34rem;
    width: 100%;
    height: 100%;
    transform: scale(0.9);
  }

  @media (max-width: 700px) {
    position: absolute;
    top: 0.8rem;
    left: 16rem;
    width: 100%;
    height: 100%;
    transform: scale(0.9);
  }

  &:hover {
    cursor: ${(props: { link: boolean }) => (props.link ? 'pointer' : '')};
  }
`
