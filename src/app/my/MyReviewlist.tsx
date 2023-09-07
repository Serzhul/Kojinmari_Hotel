import styled from '@emotion/styled'
import { IReview } from '../rooms/[id]/review/page'
import Spinner from '@components/Spinner'
import { useReviews } from '@/hooks/useReviews'

function MyReviewlist() {
  const { reviews, isLoading } = useReviews()

  if (isLoading) return <Spinner />

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        reviews?.map((item: IReview) => (
          <ReviewlistItem key={item.id}>{item.name}</ReviewlistItem>
        ))
      ) : (
        <div>리뷰 목록이 없습니다.</div>
      )}
    </div>
  )
}

export default MyReviewlist

const ReviewlistItem = styled.div`
  &:hover {
    color: var(--color-brand-500);
    cursor: pointer;
  }
`
