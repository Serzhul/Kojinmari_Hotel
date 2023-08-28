'use client'
import { useBookings } from '@/hooks/useBookings'
import Spinner from '@components/Spinner'
import styled from '@emotion/styled'
import React from 'react'
import { format } from 'date-fns'
import { formatCurrency } from '@/utils/helpers'
import { Badge, rem } from '@mantine/core'
import { useRooms } from '@/hooks/useRooms'
import { useRouter } from 'next/navigation'
import { IconToolsKitchen2 } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BOOKING_QUERY_KEY } from 'constants/queryKey'

export interface IBooking {
  created_at: string
  endDate: string | null
  extrasPrice: number | null
  guestId: string | null
  hasBreakfast: boolean | null
  id: number
  isPaid: boolean | null
  numGuests: number | null
  numNights: number | null
  observations: string | null
  roomId: number | null
  roomPrice: number | null
  startDate: string | null
  status: string | null
  totalPrice: number | null
}

function BookingPage() {
  const { bookings, isLoading: isLoadingBookings } = useBookings()
  const { rooms, isLoading: isLoadingRooms } = useRooms()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: deleteBooking, isLoading: isUpdatingWishlist } = useMutation<
    unknown,
    unknown,
    any,
    any
  >(
    (id) =>
      fetch(`/api/deleteBooking`, {
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

  if (isLoadingBookings || isLoadingRooms) return <Spinner />

  const roomIds = bookings?.map((booking) => booking.roomId)
  const bookedRoomsDetail = rooms?.filter((room) => roomIds?.includes(room.id))

  return (
    <div>
      {bookings &&
        bookedRoomsDetail &&
        bookings.map((booking, idx) => {
          const roomDetail = bookedRoomsDetail[idx]
          return (
            <BookingItem key={booking.id}>
              <div>
                <div className="flex items-center gap-8">
                  <BookingRoomTitle
                    className="text-3xl"
                    onClick={() => router.push(`/rooms/${roomDetail.id}`)}
                  >
                    {roomDetail.name}
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
                <BookingButton types="confirm">결제하기</BookingButton>
                <BookingButton types="cancel">취소하기</BookingButton>
              </BookingControl>
            </BookingItem>
          )
        })}
    </div>
  )
}

export default BookingPage

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

const BookingButton = styled.button`
  width: 10rem;
  display: flex;
  justify-content: center;
  padding: 1.4rem;
  border: 1px solid
    ${(props: { types: string }) =>
      props.types === 'confirm'
        ? 'var(--color-green-700)'
        : 'var(--color-red-400)'};
  border-radius: var(--border-radius-md);
  font-size: 1.6rem;
  background-color: ${(props: { types: string }) =>
    props.types === 'confirm'
      ? 'var(--color-green-700)'
      : 'var(--color-red-400)'};
  color: #fff;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 11px
      ${(props: { types: string }) =>
        props.types === 'confirm'
          ? 'var(--color-green-700)'
          : 'var(--color-red-400)'};
  }
`
