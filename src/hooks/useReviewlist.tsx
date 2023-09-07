import { IReview } from '@/app/review/[id]/page'
import { useQuery } from '@tanstack/react-query'
import { REVIEW_QUERY_KEY } from 'constants/queryKey'

export function useReviewlist() {
  const {
    isLoading,
    data: reviewlist,
    error,
  } = useQuery<unknown, unknown, IReview[], any>({
    queryKey: [REVIEW_QUERY_KEY],
    queryFn: () =>
      fetch(`/api/get-reviewlist`)
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, reviewlist, error }
}
