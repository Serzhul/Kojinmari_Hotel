'use client'
import styled from '@emotion/styled'
import Logo from '@components/Logo'
import LoginForm from './LoginForm'
import { redirect } from 'next/navigation'
import { useSession } from '@supabase/auth-helpers-react'

function LoginPage() {
  const session = useSession()

  if (session) redirect('/')

  return (
    <LoginLayout>
      <Logo
        style={{
          margin: '0 auto',
        }}
      />
      <LoginForm />
    </LoginLayout>
  )
}

export default LoginPage

const LoginLayout = styled.main`
  width: 500px;
  margin: 0 auto;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  position: relative;
`
