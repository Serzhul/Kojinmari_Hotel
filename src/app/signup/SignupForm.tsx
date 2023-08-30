import { useSignup } from '@/hooks/useSignup'
import { ConfirmButton } from '@components/ConfirmButton'
import Form from '@components/Form'
import FormRow from '@components/FormRow'
import Spinner from '@components/Spinner'
import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

// Email regex: /\S+@\S+\.\S+/

export interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm?: string
}

function SignupForm() {
  const router = useRouter()
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<FormValues>()
  const { errors } = formState
  const { signup, isLoading } = useSignup()

  const onSubmit: SubmitHandler<FormValues> = ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    console.log('실행되면 안됨')
    signup(
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        onSettled: () => {
          reset()
          alert(
            '가입에 성공했습니다. 입력하신 이메일로 인증 메일을 보내드렸습니다. 확인해주세요.',
          )
          router.push('/')
        },
      },
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <FormRow label="성" error={errors?.firstName?.message}>
            <Input
              type="text"
              id="lastName"
              {...register('lastName', {
                required: '필수 입력 항목입니다.',
              })}
              disabled={isLoading}
            />
          </FormRow>

          <FormRow label="이름" error={errors?.lastName?.message}>
            <Input
              type="text"
              id="firstName"
              {...register('firstName', {
                required: '필수 입력 항목입니다.',
              })}
              disabled={isLoading}
            />
          </FormRow>

          <FormRow label="이메일" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              {...register('email', {
                required: '필수 입력 항목입니다.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '유효한 이메일을 입력해주세요.',
                },
              })}
              disabled={isLoading}
            />
          </FormRow>

          <FormRow
            label="비밀번호 (8자 이상)"
            error={errors?.password?.message}
          >
            <Input
              type="password"
              id="password"
              {...register('password', {
                required: '필수 입력 항목입니다.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자 이상이어야 합니다.',
                },
              })}
              disabled={isLoading}
            />
          </FormRow>

          <FormRow
            label="비밀번호 확인"
            error={errors?.passwordConfirm?.message}
          >
            <Input
              type="password"
              id="passwordConfirm"
              {...register('passwordConfirm', {
                required: '필수 입력 항목입니다.',
                validate: (value) =>
                  value === getValues('password') ||
                  '비밀번호가 일치해야 합니다.',
              })}
              disabled={isLoading}
            />
          </FormRow>

          <div className="flex gap-8 mt-8">
            <ConfirmButton
              types="cancel"
              disabled={isLoading}
              onClick={() => router.push('/')}
            >
              취소
            </ConfirmButton>
            <ConfirmButton types="confirm" disabled={isLoading}>
              회원 가입
            </ConfirmButton>
          </div>
        </>
      )}
    </Form>
  )
}

export default SignupForm

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`
