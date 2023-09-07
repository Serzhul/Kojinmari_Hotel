import { IReview } from '@/app/review/[id]/page'
import { useQuery } from '@tanstack/react-query'
import { ROOM_REVIEW_QUERY_KEY } from 'constants/queryKey'
import { useParams } from 'next/navigation'

export function useRoomReviews() {
  const params = useParams()
  const roomId = params['id']

  const {
    isLoading,
    data: roomReviews,
    error,
  } = useQuery<unknown, unknown, IReview[], any>({
    queryKey: [ROOM_REVIEW_QUERY_KEY, roomId],
    queryFn: () =>
      fetch(`/api/get-reviews-room?roomId=${roomId}`)
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, roomReviews, error }
}
