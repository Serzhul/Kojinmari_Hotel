import styled from '@emotion/styled'
import { IReview } from '../review/[id]/page'
import Spinner from '@components/Spinner'
import { useReviewlist } from '@/hooks/useReviewlist'
import { useRouter } from 'next/navigation'

function MyReviewlist() {
  const { reviewlist, isLoading } = useReviewlist()
  const router = useRouter()

  if (isLoading) return <Spinner />

  return (
    <div>
      {reviewlist && reviewlist.length > 0 ? (
        reviewlist?.map((item: IReview) => (
          <ReviewlistItem
            key={item.id}
            onClick={() => router.push(`/rooms/${item.rooms?.id}`)}
          >
            {item?.rooms?.name}
          </ReviewlistItem>
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
