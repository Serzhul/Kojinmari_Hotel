'use client'
import { useRoomDetail } from '@/hooks/useRoom'
import React from 'react'

function RoomPage() {
  const { isLoading, room } = useRoomDetail()

  if (isLoading) return <div>isLoading...</div>

  return <div>RoomPage</div>
}

export default RoomPage
