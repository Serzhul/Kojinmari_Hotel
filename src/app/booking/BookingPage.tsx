'use client'
import styled from '@emotion/styled'
import React from 'react'
import { format } from 'date-fns'
import { formatCurrency } from '@/utils/helpers'
import { Badge } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { IconToolsKitchen2 } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BOOKING_QUERY_KEY } from 'constants/queryKey'
import { ConfirmButton } from '@components/ConfirmButton'
import EmptyPage from '@components/EmptyPage'
import { BOOKING_STATUS_MAP, BOOKING_STATUS_KEY } from 'constants/ItemMaps'
import { useBookings } from '@/hooks/useBookings'
import { useRooms } from '@/hooks/useRooms'
import Spinner from '@components/Spinner'

function BookingPage() {
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

  const roomIds = bookings?.map((booking) => booking.roomId)
  const bookedRoomsDetail = rooms?.pages?.map((page) =>
    page.filter((room) => roomIds?.includes(room.id)),
  )

  if (isLoadingBookings || isLoadingRooms) return <Spinner />

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
                  {BOOKING_STATUS_MAP[booking.status as BOOKING_STATUS_KEY]}
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
                    format(new Date(booking.startDate), 'yyyy/MM/dd')}{' '}
                  ~{' '}
                  {booking.endDate &&
                    format(new Date(booking.endDate), 'yyyy/MM/dd')}
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
              {(booking.status === 'unconfirmed' ||
                booking.status === 'confirmed') && (
                <ConfirmButton
                  types="cancel"
                  onClick={() => deleteBooking(booking.id)}
                >
                  취소하기
                </ConfirmButton>
              )}
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
