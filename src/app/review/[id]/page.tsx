'use client'

import CustomEditor from '@components/Editor'
import Spinner from '@components/Spinner'
import { Rating, rem } from '@mantine/core'
import { useSession } from '@supabase/auth-helpers-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROOM_REVIEW_QUERY_KEY } from 'constants/queryKey'

export interface IReview {
  id: string
  guestId: string
  bookingId: number
  roomId: string
  rate: number
  contents: string
  images: string
  guests?: {
    email: string
  }
  rooms?: {
    id: string
    name: string
  }
}

function ReviewEditPage({ params }: { params: { id: string } }) {
  const { id } = params
  const session = useSession()
  const guestId = session?.user.id
  const [content, setContent] = useState<string>()
  const [rate, setRate] = useState<number>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { isLoading, data: review } = useQuery<unknown, unknown, IReview, any>({
    queryKey: [ROOM_REVIEW_QUERY_KEY, 'review-privacy'],
    queryFn: () =>
      fetch(`/api/get-review?reviewId=${id}`)
        .then((res) => res.json())
        .then((data) => data.items),
  })

  useEffect(() => {
    if (review) {
      setRate(review.rate)
      setContent(review.contents)
    }
  }, [review])

  const { mutate: updateReview, isLoading: isUpdatingReview } = useMutation<
    unknown,
    unknown,
    any,
    any
  >(
    ({ reviewId, reviewContent }) =>
      fetch(`/api/update-review`, {
        method: 'POST',
        body: JSON.stringify({
          reviewId,
          reviewContent,
        }),
      }),

    {
      onSuccess: () => {
        alert('리뷰를 성공적으로 수정했습니다.')
        queryClient.invalidateQueries([ROOM_REVIEW_QUERY_KEY])
        router.push(`/rooms/${review?.rooms?.id}`)
      },
    },
  )

  const handleSave = (editorContents: string) => {
    updateReview({
      reviewId: id,
      reviewContent: {
        rate,
        contents: editorContents,
      },
    })
  }

  return (
    <>
      {isLoading || isUpdatingReview ? (
        <Spinner />
      ) : (
        <>
          {review && (
            <ReviewEditContainer>
              <RatingContainer>
                <p>{review?.rooms?.name}의 숙박은 어떠셨나요?</p>
                {rate && <Rating defaultValue={rate} size={rem(40)} />}
              </RatingContainer>
              <ContentsContainer>
                {content && (
                  <CustomEditor content={content} onSave={handleSave} />
                )}
              </ContentsContainer>
            </ReviewEditContainer>
          )}
        </>
      )}
    </>
  )
}

export default ReviewEditPage

const ReviewEditContainer = styled.div`
  margin: 3rem;
  padding: 4rem;
  margin-top: 10rem;
  font-size: 1.8rem;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 1.6rem;
`

const ContentsContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
