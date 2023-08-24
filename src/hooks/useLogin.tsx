import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const router = useRouter()

  const { mutate: login, isLoading } = useMutation<
    unknown,
    unknown,
    { email: string; password: string },
    any
  >(
    ({ email, password }) =>
      fetch(`/api/signin`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => data.item),

    {
      onSuccess: () => {
        alert('로그인에 성공했습니다.')
        router.push('/')
      },
    },
  )

  return { login, isLoading }
}