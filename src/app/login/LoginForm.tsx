import { useState } from 'react'
import Form from '@components/Form'
import styled from '@emotion/styled'
import FormRowVertical from '@components/FormRowVertical'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Form>
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
        />
      </FormRowVertical>
      <FormRowVertical>
        <LoginButton>로그인</LoginButton>
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
`
