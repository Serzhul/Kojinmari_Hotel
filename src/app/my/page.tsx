'use client'
import {
  IconHeart,
  IconBuildingSkyscraper,
  IconLockSquare,
  IconStars,
} from '@tabler/icons-react'
import { Accordion, rem, Group, Text } from '@mantine/core'
import MyWishlist from './MyWishlist'
import styled from '@emotion/styled'
import MyReviewlist from './MyReviewlist'

const charactersList = [
  {
    id: 'wishlist',
    label: '찜하기 목록',
    icon: <IconHeart size={rem(40)} />,
    content: <MyWishlist />,
  },

  {
    id: 'booking',
    label: '예약 목록',
    icon: <IconBuildingSkyscraper size={rem(40)} />,
    content: '예약 현황을 확인할 수 있습니다.',
  },
  {
    id: 'review',
    label: '평점 목록',
    icon: <IconStars size={rem(40)} />,
    content: <MyReviewlist />,
  },

  {
    id: 'privacy',
    label: '개인 정보 변경',
    icon: <IconLockSquare size={rem(40)} />,
    content: '비밀번호 및 개인 정보를 변경할 수 있습니다.',
  },
]

interface AccordionLabelProps {
  label: string
}

function AccordionLabel({ label }: AccordionLabelProps) {
  return (
    <Group noWrap spacing="xl">
      <div>
        <Text size={rem(40)}>{label}</Text>
      </div>
    </Group>
  )
}

function MyPage() {
  const items = charactersList.map((item) => (
    <AccordionItemWrapper key={item.label}>
      <Accordion.Item value={item.id}>
        <Accordion.Control icon={item.icon}>
          <AccordionLabel {...item} />
        </Accordion.Control>
        <Accordion.Panel>
          <Text size={rem(30)}>{item.content}</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </AccordionItemWrapper>
  ))

  return (
    <AccordionWrapper>
      <Accordion chevronPosition="right" variant="contained">
        {items}
      </Accordion>
    </AccordionWrapper>
  )
}

export default MyPage

const AccordionWrapper = styled.div`
  margin-top: 8rem;
`

const AccordionItemWrapper = styled.div`
  font-size: 100rem;
`
