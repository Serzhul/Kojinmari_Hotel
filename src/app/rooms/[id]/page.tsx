'use client'
import { useRoomDetail } from '@/hooks/useRoom'
import { formatCurrency } from '@/utils/helpers'
import styled from '@emotion/styled'
import Image from 'next/image'
import Carousel from 'nuka-carousel'
import {
  IconArrowLeft,
  IconArrowRight,
  IconBed,
  IconCurrencyWon,
  IconHeart,
  IconHeartFilled,
  IconUsers,
} from '@tabler/icons-react'
import { useParams, useRouter } from 'next/navigation'
import Spinner from '@components/Spinner'
import { useSession } from '@supabase/auth-helpers-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePersonalWishlist } from '@/hooks/usePersonalWishlist'
import { WISHLIST_QUERY_KEY } from 'constants/queryKey'
import { ROOM_TYPE_MAP, ROOM_TYPE_KEY } from 'constants/ItemMaps'
import SpinnerMini from '@components/SpinnerMini'
import RoomReview from './RoomReview'
interface IWishlist {
  userId: string
  roomIds: string[]
}

function RoomPage() {
  const params = useParams()
  const queryClient = useQueryClient()
  const router = useRouter()
  const session = useSession()

  const { isLoading, room: roomDetail } = useRoomDetail()
  const { personalWishlist } = usePersonalWishlist()

  const userId = session?.user?.email
  const roomId = params['id']

  const { mutate: updateWishlist, isLoading: isUpdatingWishlist } = useMutation<
    unknown,
    unknown,
    any,
    any
  >(
    ({ userId, roomId }) =>
      fetch(`/api/update-wishlist`, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          roomId,
        }),
      }),
    {
      onMutate: async (status) => {
        await queryClient.cancelQueries([WISHLIST_QUERY_KEY, session])

        const previous = queryClient.getQueryData([WISHLIST_QUERY_KEY, session])

        queryClient.setQueryData<IWishlist[]>(
          [WISHLIST_QUERY_KEY, session],
          (old) => {
            if (old) {
              if (old?.includes(status.roomId))
                return old.filter((id) => id !== status.roomId)
              return [...old, status.roomId]
            }
          },
        )

        return { previous }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [WISHLIST_QUERY_KEY],
        })
      },
    },
  )

  if (isLoading) return <Spinner />

  const addWishlist = () => {
    if (!session) {
      alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    updateWishlist({ userId, roomId })
  }

  const hasDiscount = roomDetail?.discount !== 0
  const isWished = personalWishlist ? personalWishlist.includes(roomId) : false

  return (
    <>
      <RoomDetailContainer>
        {roomDetail && (
          <>
            <CarouselContainer>
              <Carousel
                cellAlign="center"
                defaultControlsConfig={{
                  nextButtonStyle: {
                    borderRadius: '100%',
                  },
                  nextButtonText: <IconArrowRight />,
                  prevButtonStyle: {
                    borderRadius: '100%',
                  },
                  prevButtonText: <IconArrowLeft />,
                }}
              >
                {roomDetail?.image.split(',').map((image: string) => (
                  <Image
                    width="1000"
                    height="600"
                    key={image}
                    src={image}
                    alt={`${roomDetail?.name} image`}
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                ))}
              </Carousel>
            </CarouselContainer>

            <StyledDescription>
              <StyledTitle>{roomDetail?.name}</StyledTitle>
              <StyledContent>
                <div>{roomDetail?.description}</div>
              </StyledContent>
              <StyledInfoBox>
                <div className="flex flex-col items-center">
                  <IconUsers />
                  <div>최대 {roomDetail?.maxCapacity}인</div>
                </div>

                <div className="flex flex-col items-center">
                  <IconBed />
                  <div>
                    {ROOM_TYPE_MAP[roomDetail?.roomType as ROOM_TYPE_KEY]}
                  </div>
                </div>
              </StyledInfoBox>
              <StyledPriceBox>
                <div>
                  <span>가격</span>
                  {hasDiscount && (
                    <StyledDiscountBox>
                      <span>할인</span>
                    </StyledDiscountBox>
                  )}
                </div>

                <div className="flex items-center">
                  <div className="flex-col">
                    <IconCurrencyWon size={30} className="mr-8" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span
                      className={hasDiscount ? 'line-through text-red-500' : ''}
                    >
                      {formatCurrency(roomDetail?.regularPrice)}
                    </span>
                    {hasDiscount && (
                      <div className="flex items-center">
                        <div className="text-green-500 flex text-3xl">
                          {formatCurrency(roomDetail?.discount)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </StyledPriceBox>

              {hasDiscount && (
                <StyledPriceBox>
                  <div>
                    <span>최종 가격</span>
                  </div>

                  <div className="flex items-center">
                    <IconCurrencyWon size={30} className="mr-8" />
                    <span>
                      {formatCurrency(
                        roomDetail?.regularPrice - roomDetail?.discount,
                      )}
                    </span>
                  </div>
                </StyledPriceBox>
              )}
              <div className="flex mt-16">
                <WishlistButton
                  onClick={addWishlist}
                  disabled={isUpdatingWishlist}
                >
                  {isUpdatingWishlist ? (
                    <SpinnerMini />
                  ) : (
                    <>
                      {isWished ? (
                        <IconHeartFilled className="mr-4" />
                      ) : (
                        <>
                          <IconHeart className="mr-4" />
                          <span>찜하기</span>
                        </>
                      )}
                    </>
                  )}
                </WishlistButton>

                <BookingButton
                  onClick={() => router.push(`/rooms/${roomId}/booking`)}
                >
                  예약하기
                </BookingButton>
              </div>
            </StyledDescription>
          </>
        )}
      </RoomDetailContainer>

      <RoomReview />
    </>
  )
}

export default RoomPage

const RoomDetailContainer = styled.div`
  display: flex;
  margin-top: 8rem;
`

const CarouselContainer = styled.div`
  @media (max-width: 1000px) {
    position: absolute;
    width: 95%;
    top: 6rem;
    left: 2.5rem;
  }

  @media (max-width: 700px) {
    width: 88%;
    top: 9rem;
    left: 2.5rem;
  }
`

const StyledDescription = styled.div`
  font-size: 1.7rem;
  padding: 0 40px;

  @media (max-width: 1000px) {
    position: absolute;
    top: 62rem;
  }

  @media (max-width: 700px) {
    top: 34rem;
  }
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
  flex-wrap: wrap;
`

const StyledPriceBox = styled.div`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-400);
  font-size: 2.6rem;
`

const StyledDiscountBox = styled.div`
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
`

const WishlistButton = styled.button`
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

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.6rem;
  }
`

const BookingButton = styled.button`
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

  @media (max-width: 700px) {
    font-size: 2.6rem;
  }
`
