import { FormValues } from '@/app/signup/SignupForm'
import { useMutation } from '@tanstack/react-query'

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (userData: FormValues) =>
      fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Something went wrong')
          }
          return res.json()
        })
        .then((data) => data.items),
  })

  return { signup, isLoading }
}
