'use client'
import { useRooms } from '@/hooks/useRooms'
import Table from '@components/Table'
import RoomRow, { IRoom } from './RoomRow'
import Spinner from '@components/Spinner'

function RoomTable() {
  const { isLoading, rooms } = useRooms()

  return (
    <Table columns="0.6fr 0.8fr 1.2fr 1.2fr 1fr 1fr;">
      <Table.Header color="--color-brand-200">
        <div></div>
        <div>Room</div>
        <div>Room Type</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      {isLoading ? (
        <Spinner />
      ) : (
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={rooms}
          render={(room: IRoom) => <RoomRow room={room} key={room.id} />}
        />
      )}
    </Table>
  )
}

export default RoomTable
