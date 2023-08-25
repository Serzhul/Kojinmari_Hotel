'use client'
import styled from '@emotion/styled'
import Navbar from './Navbar'
import Logo from './Logo'

function Header() {
  return (
    <StyledHeader>
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
  position: relative;
`
