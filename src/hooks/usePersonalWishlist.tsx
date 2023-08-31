import { useSession } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'
import { WISHLIST_QUERY_KEY } from 'constants/queryKey'

export function usePersonalWishlist() {
  const session = useSession()

  const {
    isLoading,
    data: personalWishlist,
    error,
  } = useQuery({
    queryKey: [WISHLIST_QUERY_KEY, session],
    queryFn: () =>
      fetch('/api/get-wishlist')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, personalWishlist, error }
}
