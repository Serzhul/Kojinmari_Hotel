import { useRoomReviews } from '@/hooks/useRoomReviews'
import { maskCharacters, getPlainText } from '@/utils/helpers'
import styled from '@emotion/styled'
import { Rating, rem } from '@mantine/core'
import { useSession } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  IconArrowLeft,
  IconArrowRight,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { REVIEW_QUERY_KEY } from 'constants/queryKey'
import Modal from '@components/Modal'
import Carousel from 'nuka-carousel'

function RoomReview() {
  const { roomReviews } = useRoomReviews()
  const session = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const getCurrentDimension = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [screenSize, setScreenSize] = useState(getCurrentDimension())

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension)

    return () => {
      window.removeEventListener('resize', updateDimension)
    }
  }, [screenSize])

  const { mutate: deleteReview } = useMutation<unknown, unknown, any, any>(
    (id) =>
      fetch(`/api/delete-review`, {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [REVIEW_QUERY_KEY],
        })
      },
    },
  )

  return (
    <RoomReviewContainer>
      {roomReviews &&
        roomReviews.length > 0 &&
        roomReviews.map((review) => (
          <RoomReviewItemContainer key={review.id}>
            <Modal>
              <RoomReviewItem>
                {review.images &&
                  review.images.split(',').map((image) => (
                    <>
                      <Modal.Open opens="review" key={review.id}>
                        <Image
                          src={image}
                          alt={image}
                          width={100}
                          height={100}
                        />
                      </Modal.Open>
                      <Modal.Window name="review">
                        <Carousel
                          cellAlign="center"
                          defaultControlsConfig={{
                            nextButtonStyle: {
                              borderRadius: '100%',
                            },
                            nextButtonText: <IconArrowRight size={rem(20)} />,
                            prevButtonStyle: {
                              borderRadius: '100%',
                            },
                            prevButtonText: <IconArrowLeft size={rem(20)} />,
                          }}
                        >
                          <Image
                            src={image}
                            alt={image}
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-full h-auto"
                          />
                        </Carousel>
                      </Modal.Window>
                    </>
                  ))}

                <div className="flex flex-col items-center">
                  <Rating value={review.rate} readOnly size={rem(30)}></Rating>
                  {review.guests && (
                    <ReviewEmail>
                      {maskCharacters(review.guests.email)}
                    </ReviewEmail>
                  )}
                </div>
                <div className="text-ellipsis whitespace-nowrap">
                  {getPlainText(review.contents)}
                </div>
                {review.guestId === session?.user.id && (
                  <CommandGroup>
                    <CommandItem>
                      <IconEdit
                        onClick={() => router.push(`/review/${review.id}`)}
                        size={screenSize.width < 1000 ? rem(30) : rem(50)}
                      />
                    </CommandItem>
                    <CommandItem>
                      <IconTrash
                        size={screenSize.width < 1000 ? rem(30) : rem(50)}
                        onClick={() => deleteReview(review.id)}
                      />
                    </CommandItem>
                  </CommandGroup>
                )}
              </RoomReviewItem>
            </Modal>
          </RoomReviewItemContainer>
        ))}
    </RoomReviewContainer>
  )
}

export default RoomReview

const RoomReviewContainer = styled.div`
  width: 100%;

  @media (max-width: 1000px) {
    position: absolute;
    top: 125rem;
    padding: 0 2.4rem;
  }

  @media (max-width: 700px) {
    position: absolute;
    top: 105rem;
    padding: 0 2.8rem;
  }
`

const RoomReviewItemContainer = styled.div`
  margin: 2rem 1rem;
  border: 1px solid var(--color-brand-200);
  padding: 2rem;
  font-size: 1.6rem;
  border-radius: var(--border-radius-sm);
`

const RoomReviewItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`

const ReviewEmail = styled.div``

const CommandGroup = styled.div`
  display: flex;
  margin-left: auto;
  gap: 3rem;

  @media (max-width: 1000px) {
    gap: 1rem;
  }

  @media (max-width: 700px) {
    margin-left: 0;
    margin-top: 1rem;
    justify-content: center;
  }
`

const CommandItem = styled.div`
  &:hover {
    cursor: pointer;
    color: var(--color-brand-500);
  }

  @media (max-width: 700px) {
  }
`
