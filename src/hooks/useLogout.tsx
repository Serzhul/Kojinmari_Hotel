import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: logout, isLoading } = useMutation<unknown, unknown, any>(
    () =>
      fetch(`/api/signout`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((data) => data.item),

    {
      onSuccess: () => {
        queryClient.removeQueries()
        alert('로그아웃 했습니다!')
        router.push('/login')
        router.refresh()
      },
    },
  )

  return { logout, isLoading }
}
