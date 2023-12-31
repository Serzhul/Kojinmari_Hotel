'use client'
import styled from '@emotion/styled'
import Navbar from './Navbar'
import Logo from './Logo'
import ToggleMenu from './ToggleMenu'

function Header() {
  return (
    <StyledHeader>
      <ToggleMenu />
      <Logo link />
      <Navbar />
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 8;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1000px) {
    -webkit-backface-visibility: hidden;
  }
`
