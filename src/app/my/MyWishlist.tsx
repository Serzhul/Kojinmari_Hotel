import Spinner from '@components/Spinner'
import { useQuery } from '@tanstack/react-query'
import { IRoom } from 'constants/interfaces'
import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'
import { WISHLISTS_QUERY_KEY } from 'constants/queryKey'

function MyWishlist() {
  const router = useRouter()
  const { isLoading, data: wishlists } = useQuery({
    queryKey: [WISHLISTS_QUERY_KEY],
    queryFn: () =>
      fetch('/api/get-wishlists')
        .then((res) => res.json())
        .then((data) => data.items),
  })

  if (isLoading) return <Spinner />

  return (
    <div>
      {wishlists && wishlists.length > 0 ? (
        wishlists?.map((item: IRoom) => (
          <WishlistItem
            key={item.id}
            onClick={() => router.push(`/rooms/${item.id}`)}
          >
            {item.name}
          </WishlistItem>
        ))
      ) : (
        <div>찜하기 한 방이 없습니다.</div>
      )}
    </div>
  )
}

export default MyWishlist

const WishlistItem = styled.div`
  &:hover {
    color: var(--color-brand-500);
    cursor: pointer;
  }
`
