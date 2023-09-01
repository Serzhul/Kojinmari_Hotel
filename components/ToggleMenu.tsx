import styled from '@emotion/styled'
import { useSession } from '@supabase/auth-helpers-react'
import {
  IconBed,
  IconCalendar,
  IconLicense,
  IconLogin,
  IconUser,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Logout from './Logout'

function ToggleMenu() {
  const [isToggled, setIsToggled] = useState<boolean>(false)
  const session = useSession()
  const router = useRouter()

  return (
    <ToggleMenuContainer>
      <ToggleButtonContainer
        onClick={() => {
          setIsToggled((prev) => !prev)
        }}
      >
        <ToggleButton toggle={isToggled}></ToggleButton>
        <ToggleButton toggle={isToggled}></ToggleButton>
      </ToggleButtonContainer>
      {isToggled && (
        <ToggleMenus>
          <ToggleMenuItem
            onClick={() => {
              router.push('/rooms')
              setIsToggled(false)
            }}
          >
            <IconBed />
            <div>방 목록</div>
          </ToggleMenuItem>
          <ToggleMenuItem
            onClick={() => {
              router.push('/booking')
              setIsToggled(false)
            }}
          >
            <IconCalendar />
            <div>예약 확인</div>
          </ToggleMenuItem>
          {session ? (
            <ToggleMenuItem
              onClick={() => {
                router.push('/my')
                setIsToggled(false)
              }}
            >
              <IconUser />
              {session.user.email}
            </ToggleMenuItem>
          ) : (
            <ToggleMenuItem
              onClick={() => {
                router.push('/login')
                setIsToggled(false)
              }}
            >
              <IconLogin />
              <div>로그인</div>
            </ToggleMenuItem>
          )}
          {session ? (
            <ToggleMenuItem>
              <Logout />
            </ToggleMenuItem>
          ) : (
            <ToggleMenuItem
              onClick={() => {
                router.push('/signup')
                setIsToggled(false)
              }}
            >
              <IconLicense />
              <div>회원 가입</div>
            </ToggleMenuItem>
          )}
        </ToggleMenus>
      )}
    </ToggleMenuContainer>
  )
}

export default ToggleMenu

const ToggleMenuContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 4rem;
  left: 2rem;
  font-size: 2rem;
`

const ToggleButtonContainer = styled.div`
  position: absolute;
  z-index: 10;

  &:hover {
    cursor: pointer;
  }
`

const ToggleButton = styled.li`
  display: none;

  @media (max-width: 1000px) {
    display: block;
    width: 30px;
    height: 3px;
    background-color: var(--color-brand-500);
    margin-bottom: 6px;
    transition: 0.4s;

    &:first-of-type {
      transform: ${(props: { toggle: boolean }) =>
        props.toggle ? 'translate(0, 3.5px) rotate(45deg)' : ''};
    }

    &:last-of-type {
      transform: ${(props: { toggle: boolean }) =>
        props.toggle ? 'translate(0, -3.5px) rotate(-45deg)' : ''};
    }
  }
`

const ToggleMenus = styled.ul`
  display: none;
  position: absolute;
  left: -20px;
  width: 100%;

  @keyframes fadeInAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 1000px) {
    animation: fadeInAnimation 0.4s;
    margin-top: 2rem;
    display: block;
    background-color: #fff;
  }
`

const ToggleMenuItem = styled.li`
  padding: 1.2rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 0.5rem;

  border-bottom: 1px solid var(--color-grey-200);

  &:last-of-type {
    border: none;
  }

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`
