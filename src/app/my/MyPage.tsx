'use client'
import {
  IconHeart,
  IconBuildingSkyscraper,
  IconStars,
} from '@tabler/icons-react'
import { Accordion, rem, Group, Text } from '@mantine/core'
import MyWishlist from './MyWishlist'
import styled from '@emotion/styled'
import MyReviewlist from './MyReviewlist'
import MyBookinglist from './MyBookinglist'

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
    content: <MyBookinglist />,
  },
  {
    id: 'review',
    label: '리뷰 목록',
    icon: <IconStars size={rem(40)} />,
    content: <MyReviewlist />,
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
