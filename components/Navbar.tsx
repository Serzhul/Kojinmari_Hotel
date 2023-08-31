'use client'
import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'
import Logout from './Logout'
import { useSession } from '@supabase/auth-helpers-react'
import { UserCircle } from 'tabler-icons-react'

function Navbar() {
  const router = useRouter()
  const session = useSession()

  return (
    <MenuContainer>
      <Menu onClick={() => router.push('/rooms')}>
        <MenuItem>방 목록</MenuItem>
      </Menu>
      <Menu onClick={() => router.push('/booking')}>
        <MenuItem>예약 확인</MenuItem>
      </Menu>
      {session ? (
        <>
          <Menu onClick={() => router.push('/my')}>
            <MenuItem>
              <UserCircle />
              {session?.user.email}
            </MenuItem>
          </Menu>
          <Menu>
            <MenuItem>
              <Logout />
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Menu onClick={() => router.push('/login')}>
            <MenuItem>로그인</MenuItem>
          </Menu>
          <Menu onClick={() => router.push('/signup')}>
            <MenuItem>회원가입</MenuItem>
          </Menu>
        </>
      )}
    </MenuContainer>
  )
}

export default Navbar

const MenuContainer = styled.div`
  display: flex;

  @media (max-width: 1000px) {
    font-size: 1.5rem;
    width: 50%;
  }

  @media (max-width: 700px) {
    font-size: 1.2rem;
    background-color: red;
  }
`

const Menu = styled.nav`
  margin: 0 3rem;

  @media (max-width: 1000px) {
    font-size: 12px;
    display: none;
  }
`

const MenuItem = styled.div`
  display: flex;
  font-size: 1.5rem;
  gap: 1rem;

  &:hover {
    width: 100%;
    cursor: pointer;
    color: #7aacdf;
  }
`
