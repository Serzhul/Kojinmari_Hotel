import { useQuery } from '@tanstack/react-query'
import { WISHLIST_QUERY_KEY } from 'constants/queryKey'

export function useWishlists() {
  const {
    isLoading,
    data: wishlists,
    error,
  } = useQuery({
    queryKey: [WISHLIST_QUERY_KEY],
    queryFn: () =>
      fetch('/api/get-wishlists')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, wishlists, error }
}
