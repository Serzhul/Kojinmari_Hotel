import { Rating, rem } from '@mantine/core'
import React, { Dispatch, SetStateAction } from 'react'
import CustomEditor from './Editor'
import styled from '@emotion/styled'

function Review({
  name,
  rate,
  content,
  handleSave,
  handleRate,
}: {
  name: string
  rate: number
  content?: string
  handleSave: (editorContents: {
    contents: string
    images: string | null
  }) => void
  handleRate?: Dispatch<SetStateAction<number | undefined>>
}) {
  return (
    <ReviewEditContainer>
      <RatingContainer>
        <p>{name}의 숙박은 어떠셨나요?</p>
        {rate && <Rating value={rate} onChange={handleRate} size={rem(40)} />}
      </RatingContainer>
      <ContentsContainer>
        {content && <CustomEditor content={content} onSave={handleSave} />}
      </ContentsContainer>
    </ReviewEditContainer>
  )
}

export default Review

const ReviewEditContainer = styled.div`
  margin: 3rem;
  padding: 4rem;
  margin-top: 10rem;
  font-size: 1.8rem;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const ContentsContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
