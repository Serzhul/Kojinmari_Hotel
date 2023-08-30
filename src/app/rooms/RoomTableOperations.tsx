import { Select } from '@mantine/core'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

function RoomTableOperations() {
  const [sort, setSort] = useState<string | null>('type-asc')

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <div className="mt-8">
      <Select
        placeholder="정렬 기준"
        value={sort}
        onChange={(val) => {
          router.push(pathname + '?' + createQueryString('sortBy', val ?? ''))
          setSort(val)
        }}
        data={[
          {
            value: 'roomType-asc',
            label: '방타입순 정렬(오름차순)',
          },
          {
            value: 'roomType-desc',
            label: '방타입순 정렬(내림차순)',
          },
          {
            value: 'regularPrice-asc',
            label: '가격순 정렬(낮은 가격순)',
          },
          {
            value: 'regularPrice-desc',
            label: '가격순 정렬(높은 가격순)',
          },
          {
            value: 'maxCapacity-asc',
            label: '최대 인원 순(낮은 순)',
          },
          {
            value: 'maxCapacity-desc',
            label: '최대 인원 순(높은 순)',
          },
        ]}
        size="xl"
      />
    </div>
  )
}

export default RoomTableOperations
