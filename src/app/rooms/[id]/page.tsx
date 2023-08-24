'use client'
import { useRoomDetail } from '@/hooks/useRoom'
import { formatCurrency } from '@/utils/helpers'
import styled from '@emotion/styled'
import Image from 'next/image'
import Carousel from 'nuka-carousel'
import React from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  CurrencyWon,
  Users,
  Writing,
} from 'tabler-icons-react'
import { ROOM_TYPE_MAP, ROOM_TYPE_KEY } from '../RoomRow'

function RoomPage() {
  const { isLoading, room } = useRoomDetail()

  if (isLoading) return <div>isLoading...</div>

  const roomDetail = room[0]

  return (
    <div className="flex">
      <Carousel
        cellAlign="center"
        defaultControlsConfig={{
          nextButtonStyle: {
            borderRadius: '100%',
          },
          nextButtonText: <ArrowRight />,
          prevButtonStyle: {
            borderRadius: '100%',
          },
          prevButtonText: <ArrowLeft />,
        }}
      >
        {roomDetail.image.split(',').map((image: string) => (
          <Image
            width="1000"
            height="600"
            key={image}
            src={image}
            alt={`${roomDetail.name} image`}
            style={{
              objectFit: 'contain',
            }}
          />
        ))}
      </Carousel>

      <StyledDescription>
        <StyledTitle>{roomDetail.name}</StyledTitle>
        <StyledContent>
          <div>{roomDetail.description}</div>
        </StyledContent>
        <StyledInfoBox>
          <div className="flex flex-col items-center">
            <Users />
            <div>최대 {roomDetail.maxCapacity}인</div>
          </div>

          <div className="flex flex-col items-center">
            <Bed />
            <div>{ROOM_TYPE_MAP[roomDetail.room_type as ROOM_TYPE_KEY]}</div>
          </div>
        </StyledInfoBox>
        <StyledPriceBox>
          <span>가격</span>

          <div className="flex items-center">
            <CurrencyWon size={30} className="mr-8" />
            {formatCurrency(roomDetail.regularPrice)}
          </div>
        </StyledPriceBox>
        <ReservationButton>예약하러 가기</ReservationButton>
      </StyledDescription>
    </div>
  )
}

export default RoomPage

const StyledDescription = styled.div`
  font-size: 1.7rem;
  padding: 0 40px;
`

const StyledTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 40px 0;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  line-height: 2;
`

const StyledInfoBox = styled.div`
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid var(--color-grey-600);
  margin-bottom: 2.6rem;
`

const StyledPriceBox = styled.div`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-400);
  font-size: 2.6rem;
  margin-bottom: 2.6rem;
`

const ReservationButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  font-size: 3rem;
  border-radius: 8px;
  background-color: var(--color-blue-700);
  border: 1px solid var(--color-blue-400);
  color: white;

  &:hover {
    color: var(--color-blue-700);
    background-color: white;
  }
`
