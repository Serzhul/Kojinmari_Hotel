import { useRoomReviews } from '@/hooks/useRoomReviews'
import { maskCharacters, getPlainText } from '@/utils/helpers'
import styled from '@emotion/styled'
import { Rating, rem } from '@mantine/core'
import { useSession } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function RoomReview() {
  const { roomReviews } = useRoomReviews()
  const session = useSession()
  const router = useRouter()

  return (
    <>
      {roomReviews &&
        roomReviews.length > 0 &&
        roomReviews.map((review) => (
          <RoomReviewContainer key={review.id}>
            <div className="flex justify-between">
              <RoomReviewItem>
                {review.images &&
                  review.images
                    .split(',')
                    .map((image) => (
                      <Image key={review.id} src={image} alt={image} />
                    ))}
                <div className="flex flex-col items-center">
                  <Rating value={review.rate} readOnly size={rem(30)}></Rating>
                  {review.guests && (
                    <ReviewEmail>
                      {maskCharacters(review.guests.email)}
                    </ReviewEmail>
                  )}
                </div>
                <div>{getPlainText(review.contents)}</div>
              </RoomReviewItem>
              {review.guestId === session?.user.id && (
                <EditButton onClick={() => router.push(`/review/${review.id}`)}>
                  수정하기
                </EditButton>
              )}
            </div>
          </RoomReviewContainer>
        ))}
    </>
  )
}

export default RoomReview

const RoomReviewContainer = styled.div`
  margin: 2rem 1rem;
  border: 1px solid var(--color-brand-200);
  padding: 2rem;
  font-size: 1.6rem;
  border-radius: var(--border-radius-sm);
`

const RoomReviewItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`

const ReviewEmail = styled.div``

const EditButton = styled.button`
  border: 1px solid var(--color-green-700);
  background-color: var(--color-green-700);
  color: #fff;
  border-radius: var(--border-radius-sm);
  padding: 1.2rem;
`
