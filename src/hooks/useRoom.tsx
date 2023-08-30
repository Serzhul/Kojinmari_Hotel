import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { IRoom } from 'constants/interfaces'

export function useRoomDetail() {
  const params = useParams()
  const roomId = params['id']

  const {
    isLoading,
    data: room,
    error,
  } = useQuery<unknown, unknown, IRoom, any>({
    queryKey: [`room ${roomId}`],
    queryFn: () =>
      fetch(`/api/get-room?roomId=${roomId}`)
        .then((res) => res.json())
        .then((data) => data.item),
  })

  return { isLoading, room, error }
}
