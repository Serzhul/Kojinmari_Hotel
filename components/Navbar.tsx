'use client'
import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'

function Navbar() {
  const router = useRouter()

  return (
    <div className="flex">
      <Menu onClick={() => router.push('/rooms')}>
        <MenuItem>방 목록</MenuItem>
      </Menu>
      <Menu onClick={() => router.push('/my')}>
        <MenuItem>예약 확인</MenuItem>
      </Menu>
      <Menu onClick={() => router.push('/login')}>
        <MenuItem>로그인</MenuItem>
      </Menu>
    </div>
  )
}

export default Navbar

const Menu = styled.nav`
  margin: 0 15px;
`

const MenuItem = styled.div`
  font-size: 1.5rem;

  &:hover {
    width: 100%;
    cursor: pointer;
    color: #7aacdf;
  }
`
