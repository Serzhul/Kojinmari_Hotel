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
import { useCallback, useState } from 'react'

function RoomReviewPage({ roomId }: { roomId: string }) {
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

  const handleSave = useCallback(
    (editorContents: { contents: string; images: string | null }) => {
      addReview({
        id: undefined,
        bookingId: Number(bookingId),
        guestId: session?.user.id ?? '',
        roomId,
        rate: rate ?? 1,
        contents: editorContents.contents,
        images: editorContents?.images,
      })
    },
    [addReview, bookingId, rate, roomId, session?.user.id],
  )

  if (isLoading) return <Spinner />

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
