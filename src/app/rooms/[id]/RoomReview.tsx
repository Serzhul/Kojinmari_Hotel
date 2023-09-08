import { useRoomReviews } from '@/hooks/useRoomReviews'
import { maskCharacters, getPlainText } from '@/utils/helpers'
import styled from '@emotion/styled'
import { Rating, rem } from '@mantine/core'
import { useSession } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { REVIEW_QUERY_KEY } from 'constants/queryKey'

function RoomReview() {
  const { roomReviews } = useRoomReviews()
  const session = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: deleteReview } = useMutation<unknown, unknown, any, any>(
    (id) =>
      fetch(`/api/delete-review`, {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [REVIEW_QUERY_KEY],
        })
      },
    },
  )

  return (
    <>
      {roomReviews &&
        roomReviews.length > 0 &&
        roomReviews.map((review) => (
          <RoomReviewContainer key={review.id}>
            <div className="flex justify-between items-center">
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
                <CommandGroup>
                  <CommandItem>
                    <IconEdit
                      onClick={() => router.push(`/review/${review.id}`)}
                      size={rem(50)}
                    />
                  </CommandItem>
                  <CommandItem>
                    <IconTrash
                      size={rem(50)}
                      onClick={() => deleteReview(review.id)}
                    />
                  </CommandItem>
                </CommandGroup>
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

const CommandGroup = styled.div`
  display: flex;
  gap: 3rem;
`

const CommandItem = styled.div`
  &:hover {
    cursor: pointer;
    color: var(--color-brand-500);
  }
`
