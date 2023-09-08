import styled from '@emotion/styled'
import Spinner from '@components/Spinner'
import { useRouter } from 'next/navigation'
import { useBookings } from '@/hooks/useBookings'

function MyBookinglist() {
  const router = useRouter()
  const { bookings, isLoading } = useBookings()

  if (isLoading) return <Spinner />

  return (
    <div>
      {bookings && bookings.length > 0 ? (
        bookings?.map((item) => (
          <BookinglistContainer key={item.id}>
            <BookinglistItem
              onClick={() => router.push(`/rooms/${item.roomId}`)}
            >
              {item?.rooms?.name}
            </BookinglistItem>
            {item.status === 'checkout' && !item.hasReview && (
              <BookingReviewButton
                onClick={() =>
                  router.push(
                    `/rooms/${item.roomId}/review?bookingId=${item.id}`,
                  )
                }
              >
                리뷰 쓰기
              </BookingReviewButton>
            )}
          </BookinglistContainer>
        ))
      ) : (
        <div>예약 목록이 없습니다.</div>
      )}
    </div>
  )
}

export default MyBookinglist

const BookinglistContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const BookinglistItem = styled.div`
  &:hover {
    color: var(--color-brand-500);
    cursor: pointer;
  }
`

const BookingReviewButton = styled.button`
  font-size: 1.4rem;
  border: 1px solid var(--color-indigo-700);
  background-color: var(--color-indigo-700);
  border-radius: var(--border-radius-md);
  padding: 0.5rem;
  color: #fff;
`
