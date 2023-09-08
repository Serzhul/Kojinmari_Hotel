'use client'
import { IReview } from '@/app/review/[id]/page'
import { useRoomDetail } from '@/hooks/useRoomDetail'
import Review from '@components/Review'
import Spinner from '@components/Spinner'
import styled from '@emotion/styled'
import { useSession } from '@supabase/auth-helpers-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { REVIEW_QUERY_KEY } from 'constants/queryKey'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

function RoomReviewPage({ params }: { params: { id: string } }) {
  const { id: roomId } = params
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')
  const [rate, setRate] = useState<number>()
  const queryClient = useQueryClient()
  const router = useRouter()
  const session = useSession()

  const { room, isLoading } = useRoomDetail()

  const { mutate: addReview } = useMutation<unknown, unknown, IReview, any>(
    (item) =>
      fetch(`/api/add-review`, {
        method: 'POST',
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        }),
    {
      onMutate: () => {
        queryClient.invalidateQueries([REVIEW_QUERY_KEY])
      },
      onSuccess: () => {
        router.push(`/rooms/${roomId}`)
      },
    },
  )

  if (isLoading) return <Spinner />

  const handleSave = (editorContents: string) => {
    addReview({
      id: undefined,
      bookingId: Number(bookingId),
      guestId: session?.user.id ?? '',
      roomId,
      rate: rate ?? 1,
      contents: editorContents,
      images: '',
    })
  }

  return (
    <RoomReviewPageContainer>
      {room && (
        <Review
          name={room?.name}
          rate={rate ?? 1}
          content={'리뷰 내용을 입력해주세요.'}
          handleRate={setRate}
          handleSave={handleSave}
        />
      )}
    </RoomReviewPageContainer>
  )
}

export default RoomReviewPage

const RoomReviewPageContainer = styled.div`
  margin-top: 10rem;
`
