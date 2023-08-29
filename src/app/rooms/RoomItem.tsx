import { formatCurrency } from '@/utils/helpers'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export interface IRoom {
  id: number
  image: string
  name: string
  room_type: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
}

export const ROOM_TYPE_MAP = {
  single: '싱글룸 (싱글 침대 1개)',
  double: '더블룸 (더블 침대 1개)',
  twin: '트윈룸 (싱글 침대 2개)',
  triple: '트리플룸 (더블 침대 1개, 간이 침대 1개)',
}

export type ROOM_TYPE_KEY = keyof typeof ROOM_TYPE_MAP

function RoomItem({ room }: { room: IRoom }) {
  const router = useRouter()
  const { id, name, maxCapacity, room_type, regularPrice, discount, image } =
    room

  return (
    <RoomItemContainer onClick={() => router.push(`/rooms/${id}`)}>
      <Image
        width={640}
        height={400}
        src={image.split(',')[0]}
        alt={name}
        style={ImgStyle}
      />
      <RoomInfo>{name}</RoomInfo>
      <div>{ROOM_TYPE_MAP[room_type as ROOM_TYPE_KEY]}</div>
      <div>최대 {maxCapacity} 인</div>

      {discount ? (
        <>
          <Price className="line-through">{formatCurrency(regularPrice)}</Price>
          <Discount>{formatCurrency(regularPrice - discount)} 원</Discount>
        </>
      ) : (
        <Price>{formatCurrency(regularPrice)} 원</Price>
      )}
    </RoomItemContainer>
  )
}

export default RoomItem

const RoomItemContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--border-radius-md);
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
    transform: scale(1.05, 1.05);
  }
`

const ImgStyle = {
  display: 'block',
  width: '32.5rem',
  aspectRatio: '2 / 1',
  objectPosition: 'center',
  borderRadius: 'var(--border-radius-md)',
}

const RoomInfo = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
`

const Price = styled.div`
  font-weight: 600;
`

const Discount = styled.div`
  font-weight: 500;
  color: var(--color-red-400);
`
