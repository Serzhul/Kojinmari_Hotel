'use client'
import { useRoomDetail } from '@/hooks/useRoom'
import Spinner from '@components/Spinner'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { formatCurrency, fromToday } from '@/utils/helpers'
import { useSession } from '@supabase/auth-helpers-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IBooking } from '@/app/booking/page'
import { BOOKING_QUERY_KEY } from 'constants/queryKey'
import { useRouter } from 'next/navigation'
import { randomUUID } from 'crypto'
import { randomId } from '@mantine/hooks'

function RoomBookingPage() {
  const { room, isLoading } = useRoomDetail()
  const session = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: addBooking, isLoading: isAddingBooking } = useMutation<
    unknown,
    unknown,
    IBooking,
    any
  >(
    (item) =>
      fetch(`/api/add-booking`, {
        method: 'POST',
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        }),
    {
      onMutate: () => {
        queryClient.invalidateQueries([BOOKING_QUERY_KEY])
      },
      onSuccess: () => {
        router.push('/booking')
      },
    },
  )

  if (isLoading) return <Spinner />

  const today = new Date()
  const tomorrow = today.setDate(today.getDate() + 1)

  return (
    <RoomBookingContainer>
      {room && (
        <>
          <RoomBookingTitle>예약 상세</RoomBookingTitle>
          <RoomBookingInfo>
            <RoomBookingInfoItem>
              <div>
                <div>체크인</div>
                {format(today, 'yyyy-MM-dd')}
              </div>
              <div>
                <div>체크아웃</div>
                {format(tomorrow, 'yyyy-MM-dd')}
              </div>
            </RoomBookingInfoItem>
            <RoomBookingInfoItem>
              <div>{session?.user.email} 님</div>
              <div>
                <div>연락처</div>
                {session?.user.phone ? session?.user.phone : '000-0000-0000'}
              </div>
            </RoomBookingInfoItem>
            <RoomBookingInfoItem>
              <div>(주) 코진마리 호텔</div>
              <div>TEL: 02) 0000-0000</div>
            </RoomBookingInfoItem>
          </RoomBookingInfo>

          <RoomBookingDetail>
            <RoomBookingDetailHeader>
              <h3 className="text-2xl font-semibold">예약 내용</h3>
              <h3 className="text-2xl font-semibold">숙박 일수</h3>
              <h3 className="text-2xl font-semibold">가격</h3>
            </RoomBookingDetailHeader>

            <RoomBookingDetailItem>
              <div>{room?.name}</div>
              <div>1 일</div>
              <div>₩ {formatCurrency(Number(room?.regularPrice))}</div>
            </RoomBookingDetailItem>
            {room?.discount !== 0 && (
              <RoomBookingDetailItem>
                <div>할인</div>
                <div>-</div>
                <div className="text-emerald-500">
                  ₩ {formatCurrency(Number(room?.discount))}
                </div>
              </RoomBookingDetailItem>
            )}
          </RoomBookingDetail>
          <RoomBookingTotal>
            <div className="flex justify-between text-2xl pb-4">
              <div>총계</div>
              <div>
                ₩{' '}
                {room?.discount
                  ? formatCurrency(Number(room?.regularPrice - room?.discount))
                  : formatCurrency(Number(room?.regularPrice))}
              </div>
            </div>
          </RoomBookingTotal>
          <RoomBookingButton
            onClick={() =>
              addBooking({
                id: undefined,
                startDate: fromToday(0),
                endDate: fromToday(1),
                numNights: 1,
                numGuests: room?.maxCapacity,
                roomPrice: room?.regularPrice,
                extrasPrice: 0,
                totalPrice: room?.discount
                  ? room?.regularPrice - room?.discount
                  : room?.regularPrice,
                status: 'unconfirmed',
                hasBreakfast: false,
                isPaid: false,
                observations: '',
                roomId: room?.id,
                guestId: session?.user.id ?? '',
              })
            }
          >
            예약 확정
          </RoomBookingButton>
        </>
      )}
    </RoomBookingContainer>
  )
}

export default RoomBookingPage

const RoomBookingContainer = styled.div`
  margin: 4rem auto;
  min-height: 50%;
  width: 100rem;
  padding: 1.8rem;
  border: 1px solid var(--color-grey-400);
  border-radius: var(--border-radius-md);
`

const RoomBookingTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: 3rem 0;
`

const RoomBookingInfo = styled.div`
  font-size: 1.4rem;
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  border-top: 1px solid var(--color-grey-400);
  border-bottom: 1px solid var(--color-grey-400);
`

const RoomBookingInfoItem = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.8rem 2rem;
  border-right: 1px solid var(--color-grey-400);

  &:last-child {
    border: none;
  }
`

const RoomBookingDetail = styled.div`
  width: 100%;
  margin: 2.6rem 0;
`

const RoomBookingDetailHeader = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr;
  width: 100%;
  border-bottom: 1px solid var(--color-grey-400);
  padding: 1.8rem;
`

const RoomBookingDetailItem = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr;
  width: 100%;
  padding: 1.8rem;
  font-size: 1.4rem;
`

const RoomBookingTotal = styled.div`
  width: 23%;
  margin-left: auto;
  border-bottom: 1px solid var(--color-grey-400);
  color: var(--color-red-400);
`

const RoomBookingButton = styled.button`
  margin-top: 1.5rem;
  margin-left: auto;
  width: 15rem;
  padding: 0.8rem;
  margin-right: 1rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-red-400);
  border-radius: var(--border-radius-md);
  background-color: var(--color-red-400);
  color: #fff;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
    transform: scale(1.05, 1.05);
  }
`
