'use client'
import styled from '@emotion/styled'
import SignupForm from './SignupForm'

function SignupPage() {
  return (
    <SignupContainer>
      <SignupForm />
    </SignupContainer>
  )
}

export default SignupPage

const SignupContainer = styled.div`
  width: 60rem;
  margin: 4rem auto;
`
