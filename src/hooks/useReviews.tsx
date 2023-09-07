import { IReview } from '@/app/rooms/[id]/review/page'
import { useQuery } from '@tanstack/react-query'
import { REVIEW_QUERY_KEY } from 'constants/queryKey'

export function useReviews() {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery<unknown, unknown, IReview[], any>({
    queryKey: [REVIEW_QUERY_KEY],
    queryFn: () =>
      fetch(`/api/get-reviews`)
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, reviews, error }
}
