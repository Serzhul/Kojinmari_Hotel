import { useQuery } from '@tanstack/react-query'
import { IBooking } from '../app/booking/page'
import { BOOKING_QUERY_KEY } from 'constants/queryKey'

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery<unknown, unknown, IBooking[], any>({
    queryKey: [BOOKING_QUERY_KEY],
    queryFn: () =>
      fetch('/api/get-booking')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  return { isLoading, bookings, error }
}
