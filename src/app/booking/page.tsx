'use client'
import { useBookings } from '@/hooks/useBookings'
import Spinner from '@components/Spinner'
import styled from '@emotion/styled'
import React from 'react'
import { format } from 'date-fns'
import { formatCurrency } from '@/utils/helpers'
import { Badge } from '@mantine/core'
import { useRooms } from '@/hooks/useRooms'
import { redirect, useRouter } from 'next/navigation'
import { IconToolsKitchen2 } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BOOKING_QUERY_KEY } from 'constants/queryKey'
import { ConfirmButton } from '@components/ConfirmButton'
import { IRoom } from 'constants/interfaces'
import EmptyPage from '@components/EmptyPage'
import { useSession } from '@supabase/auth-helpers-react'

export interface IBooking {
  endDate: string | null
  extrasPrice: number | null
  guestId: string | null
  hasBreakfast: boolean | null
  id: number | undefined
  isPaid: boolean | null
  numGuests: number | null
  numNights: number | null
  observations: string | null
  roomId: number | null
  roomPrice: number | null
  startDate: string | null
  status: string | null
  totalPrice: number | null
  rooms?: IRoom
}

function BookingPage() {
  const session = useSession()

  if (!session) {
    redirect('/unauthenticated')
  }

  const { bookings, isLoading: isLoadingBookings } = useBookings()
  const { rooms, isLoading: isLoadingRooms } = useRooms()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: deleteBooking } = useMutation<unknown, unknown, any, any>(
    (id) =>
      fetch(`/api/delete-booking`, {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [BOOKING_QUERY_KEY],
        })
      },
    },
  )

  const { mutate: updateBooking } = useMutation<unknown, unknown, any, any>(
    (id) =>
      fetch(`/api/update-booking`, {
        method: 'POST',
        body: JSON.stringify({
          bookingId: id,
          status: 'confirmed',
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [BOOKING_QUERY_KEY],
        })
      },
    },
  )

  if (isLoadingBookings || isLoadingRooms) return <Spinner />

  const roomIds = bookings?.map((booking) => booking.roomId)
  const bookedRoomsDetail = rooms?.pages?.map((page) =>
    page.filter((room) => roomIds?.includes(room.id)),
  )

  return (
    <BookingPageContainer>
      {bookings && bookedRoomsDetail && bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingItem key={booking.id}>
            <div>
              <div className="flex items-center gap-8">
                <BookingRoomTitle
                  className="text-3xl"
                  onClick={() => router.push(`/rooms/${booking.roomId}`)}
                >
                  {booking.rooms?.name}
                </BookingRoomTitle>
                <Badge
                  size="xl"
                  color={booking.status === 'unconfirmed' ? 'red' : 'teal'}
                >
                  {booking.status === 'unconfirmed' && '결제 대기중'}
                  {booking.status === 'confirmed' && '예약 확정'}
                </Badge>
              </div>
            </div>

            <div className="flex gap-8">
              <BookingDetailTitle>
                <div className="text-2xl">숙박 일정</div>
                <div className="text-2xl">숙박 일수</div>
                <div className="text-2xl">숙박 최대 인원</div>
                <div className="text-2xl">방 예약 가격</div>
                {booking.hasBreakfast && (
                  <div className="text-2xl">기타 가격</div>
                )}
                <div className="text-3xl font-semibold">최종 예약 가격</div>
              </BookingDetailTitle>

              <BookingDetailData>
                <div className="text-2xl">
                  {booking?.startDate &&
                    format(new Date(booking.startDate), 'yyyy/mm/dd')}{' '}
                  ~{' '}
                  {booking.endDate &&
                    format(new Date(booking.endDate), 'yyyy/mm/dd')}
                </div>
                <div className="flex items-center">
                  <div className="text-2xl">{booking.numNights}일</div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl">{booking.numGuests}명</div>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl">
                    {booking.roomPrice && formatCurrency(booking.roomPrice)}
                  </div>
                </div>
                {booking.hasBreakfast && (
                  <div className="flex items-center">
                    <div className="text-2xl">
                      {booking.extrasPrice &&
                        formatCurrency(booking.extrasPrice)}
                    </div>
                    <IconToolsKitchen2
                      style={{
                        marginLeft: '2rem',
                        color: 'var(--color-brand-500)',
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <div className="text-3xl font-bold">
                    {booking.totalPrice && formatCurrency(booking.totalPrice)}
                  </div>
                </div>
              </BookingDetailData>
            </div>

            <BookingControl>
              {booking.status === 'unconfirmed' && (
                <ConfirmButton
                  types="confirm"
                  onClick={() => updateBooking(booking.id)}
                >
                  결제하기
                </ConfirmButton>
              )}
              <ConfirmButton
                types="cancel"
                onClick={() => deleteBooking(booking.id)}
              >
                취소하기
              </ConfirmButton>
            </BookingControl>
          </BookingItem>
        ))
      ) : (
        <EmptyPage>예약 내용이 없습니다...</EmptyPage>
      )}
    </BookingPageContainer>
  )
}

export default BookingPage

const BookingPageContainer = styled.div`
  margin-top: 10rem;
`

const BookingItem = styled.div`
  margin: 1.6rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-brand-500);
  border-radius: var(--border-radius-md);
  gap: 2rem;
`

const BookingDetailTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

const BookingDetailData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

const BookingRoomTitle = styled.h3`
  color: var(--color-brand-200);

  &:hover {
    color: var(--color-grey-700);
    cursor: pointer;
  }
`

const BookingControl = styled.div`
  display: flex;
  gap: 2.6rem;
`
