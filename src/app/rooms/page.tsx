'use client'
import React from 'react'
import RoomTable from './RoomTable'
import Row from '@components/Row'
import RoomTableOperations from './RoomTableOperations'
import Heading from '@components/Heading'

function RoomsPage() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        <RoomTableOperations />
      </Row>
      <RoomTable />
    </>
  )
}

export default RoomsPage
