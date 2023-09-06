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
  width: 50%;
  margin: 4rem auto;

  @media (max-width: 1000px) {
    margin-top: 10rem;
    width: 80%;
  }

  @media (max-width: 700px) {
    margin-top: 10rem;
    width: 80%;
  }
`
