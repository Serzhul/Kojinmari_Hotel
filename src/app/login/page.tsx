'use client'
import styled from '@emotion/styled'
import Logo from '@components/Logo'
import Heading from '@components/Heading'
import LoginForm from './LoginForm'

function LoginPage() {
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
