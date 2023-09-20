'use client'
import Spinner from '@components/Spinner'
import { useSession } from '@supabase/auth-helpers-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { ROOM_REVIEW_QUERY_KEY } from 'constants/queryKey'
import Review from '@components/Review'
import { toast } from 'react-toastify'

export interface IReview {
  id: string | undefined
  guestId: string
  bookingId: number
  roomId: string
  rate: number
  contents: string
  images: string | null
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

  if (!session) {
    redirect('/unauthenticated')
  }

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
        toast.success(
          <div className="text-2xl">리뷰를 성공적으로 수정했습니다.</div>,
        )
        queryClient.invalidateQueries([ROOM_REVIEW_QUERY_KEY])
        router.push(`/rooms/${review?.rooms?.id}`)
      },
    },
  )

  const handleSave = (editorContents: {
    contents: string
    images: string | null
  }) => {
    updateReview({
      reviewId: id,
      reviewContent: {
        rate,
        contents: editorContents.contents,
        images: editorContents?.images,
      },
    })
  }

  return (
    <>
      {isLoading || isUpdatingReview ? (
        <Spinner />
      ) : (
        <>
          {review && rate && content && (
            <Review
              name={review.rooms?.name ?? ''}
              rate={rate}
              handleRate={setRate}
              content={content}
              handleSave={handleSave}
            />
          )}
        </>
      )}
    </>
  )
}

export default ReviewEditPage
