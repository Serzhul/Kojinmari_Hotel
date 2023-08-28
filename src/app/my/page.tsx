'use client'
import {
  IconHeart,
  IconBuildingSkyscraper,
  IconLockSquare,
} from '@tabler/icons-react'
import { Accordion, rem, Group, Text } from '@mantine/core'
import MyWishlist from './MyWishlist'

const charactersList = [
  {
    id: 'wishlist',
    label: '찜하기 목록',
    icon: <IconHeart size={rem(30)} />,
    content: <MyWishlist />,
  },

  {
    id: 'booking',
    label: '예약 목록',
    icon: <IconBuildingSkyscraper size={rem(30)} />,
    content: '예약 현황을 확인할 수 있습니다.',
  },

  {
    id: 'privacy',
    label: '개인 정보 변경',
    icon: <IconLockSquare size={rem(30)} />,
    content: '비밀번호 및 개인 정보를 변경할 수 있습니다.',
  },
]

interface AccordionLabelProps {
  label: string
}

function AccordionLabel({ label }: AccordionLabelProps) {
  return (
    <Group noWrap>
      <div>
        <Text size={rem(30)}>{label}</Text>
      </div>
    </Group>
  )
}

function MyPage() {
  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control icon={item.icon}>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size={rem(30)}>{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ))

  return (
    <Accordion chevronPosition="right" variant="contained">
      {items}
    </Accordion>
  )
}

export default MyPage
