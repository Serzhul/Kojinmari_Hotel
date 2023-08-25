'use client'
import { useState } from 'react'
import Form from '@components/Form'
import styled from '@emotion/styled'
import FormRowVertical from '@components/FormRowVertical'
import { useLogin } from '@/hooks/useLogin'
import { SyntheticEvent } from 'react'
import SpinnerMini from '@components/SpinnerMini'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const { login, isLoading } = useLogin()

  const supabase = createClientComponentClient()

  const handleSignIn = async (e: SyntheticEvent) => {
    e.preventDefault()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  // const handleSubmit = (e: SyntheticEvent) => {
  //   e.preventDefault()
  //   if (!email || !password) return

  //   login(
  //     { email, password },
  //     {
  //       onSuccess: () => {
  //         router.refresh()
  //       },
  //       onSettled: () => {
  //         setEmail('')
  //         setPassword('')
  //       },
  //     },
  //   )
  // }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <Form onSubmit={handleSignIn}>
      <FormRowVertical label="이메일">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="비밀번호">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <div>
          <LoginButton>로그인</LoginButton>
          {/* <LoginButton disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : '로그인'}
          </LoginButton> */}

          <GoogleLoginButton onClick={loginWithGoogle}>
            Google
          </GoogleLoginButton>
        </div>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm

const Input = styled.input`
  border: 1px solid var(--color-brand-200);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
    caret-color: var(--color-blue-700);
  }
`

const LoginButton = styled.button`
  margin: 0 auto;
  padding: 0.8rem 1.2rem;
  color: white;
  width: 100%;
  background-color: var(--color-brand-200);
  border-radius: var(--border-radius-sm);
  margin-bottom: 13px;
`

const GoogleLoginButton = styled.button`
  width: 100%;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow:
    0 -1px 0 rgba(0, 0, 0, 0.04),
    0 1px 1px rgba(0, 0, 0, 0.25);

  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 14px;

  &:hover {
    box-shadow:
      0 -1px 0 rgba(0, 0, 0, 0.04),
      0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow:
      0 -1px 0 rgba(0, 0, 0, 0.04),
      0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow:
      0 -1px 0 rgba(0, 0, 0, 0.04),
      0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
`
