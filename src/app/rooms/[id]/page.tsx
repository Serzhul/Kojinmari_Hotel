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
  Heart,
  Users,
  Writing,
} from 'tabler-icons-react'
import { ROOM_TYPE_MAP, ROOM_TYPE_KEY } from '../RoomRow'
import { useRouter } from 'next/navigation'
import Spinner from '@components/Spinner'

function RoomPage() {
  const router = useRouter()
  const { isLoading, room } = useRoomDetail()

  if (isLoading) return <Spinner />

  const roomDetail = room[0]

  const addWishlist = () => {
    // TODO: wishlist 등록하기
    alert('로그인이 필요합니다.')
    router.push('/login')
  }

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
        <div className="flex">
          <WishlistButton onClick={addWishlist}>
            <Heart className="mr-4" />
            찜하기
          </WishlistButton>
          <ReservationButton>예약하러 가기</ReservationButton>
        </div>
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
  border-radius: var(--border-radius-md);
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

const WishlistButton = styled.button`
  width: 15rem;
  padding: 8px;
  margin-right: 1rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-red-400);
  border-radius: var(--border-radius-md);
  background-color: var(--color-red-400);
  color: #fff;
`

const ReservationButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  font-size: 3rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-blue-700);
  border: 1px solid var(--color-brand-200);
  color: white;

  &:hover {
    color: var(--color-blue-700);
    background-color: white;
  }
`
