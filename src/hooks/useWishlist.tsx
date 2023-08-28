import { useQuery } from '@tanstack/react-query'
import { PERSONAL_WISHLIST_KEY } from 'constants/queryKey'

export function useWishlists() {
  const {
    isLoading,
    data: wishlists,
    error,
  } = useQuery({
    queryKey: [PERSONAL_WISHLIST_KEY],
    queryFn: () =>
      fetch('/api/get-wishlist')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, wishlists, error }
}
