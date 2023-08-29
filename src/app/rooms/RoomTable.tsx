'use client'
import { useRooms } from '@/hooks/useRooms'
import RoomItem from './RoomItem'
import Spinner from '@components/Spinner'
import Heading from '@components/Heading'
import RoomTableOperations from './RoomTableOperations'
import { useEffect, useRef } from 'react'

function RoomTable() {
  const { isLoading, fetchNextPage, rooms } = useRooms()

  const scrollRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => fetchNextPage())
    })
    if (scrollRef.current) {
      observer.observe(scrollRef.current)
    }
  }, [fetchNextPage, scrollRef])

  return (
    <div className="p-8">
      <Heading as="h1">방 목록</Heading>
      <RoomTableOperations />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap gap-8">
          {rooms?.pages?.map(
            (page) =>
              page?.map((room) => <RoomItem room={room} key={room.id} />),
          )}
        </div>
      )}
      <span ref={scrollRef} />
    </div>
  )
}

export default RoomTable
