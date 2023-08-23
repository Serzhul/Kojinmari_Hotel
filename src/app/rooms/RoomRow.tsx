import { formatCurrency } from '@/utils/helpers'
import Table from '@components/Table'
import styled from '@emotion/styled'
import Image from 'next/image'

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

const ROOM_TYPE_MAP = {
  single: '싱글룸 (싱글 침대 1개)',
  double: '더블룸 (더블 침대 1개)',
  twin: '트윈룸 (싱글 침대 2개)',
  triple: '트리플룸 (더블 침대 1개, 간이 침대 1개)',
}

type ROOM_TYPE_KEY = keyof typeof ROOM_TYPE_MAP

function RoomRow({ room }: { room: IRoom }) {
  const {
    id,
    name,
    maxCapacity,
    room_type,
    regularPrice,
    discount,
    description,
    image,
  } = room

  return (
    <Table.Row>
      <Image width={640} height={400} src={image} alt={name} style={ImgStyle} />
      <Room>{name}</Room>
      <div>{ROOM_TYPE_MAP[room_type as ROOM_TYPE_KEY]}</div>
      <div>최대 {maxCapacity} 인</div>

      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
    </Table.Row>
  )
}

export default RoomRow

const ImgStyle = {
  display: 'block',
  width: '8rem',
  aspectRatio: '3 / 2',
  objectPosition: 'center',
  transform: 'scale(1.5) translateX(-7px)',
}

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`
