import { FormValues } from '@/app/signup/SignupForm'
import { useMutation } from '@tanstack/react-query'

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (userData: FormValues) =>
      fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => data.items),
    onSuccess: (user) => {
      console.log(user)
    },
  })

  return { signup, isLoading }
}
