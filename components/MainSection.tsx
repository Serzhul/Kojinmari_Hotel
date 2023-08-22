import Image from 'next/image'
import React, { CSSProperties } from 'react'

function MainSection({
  sectionStyle,
  roomImage,
}: {
  sectionStyle: CSSProperties
}) {
  return (
    <section
      className="relative"
      style={{
        width: '100%',
        height: '70vh',
        backgroundImage: `url('/white-1.jpeg')`,
      }}
    >
      <div
        className="flex items-center absolute"
        style={{
          top: '50px',
          left: '50px',
        }}
      >
        <Image
          src="/hotel_room_main.jpeg"
          width="500"
          height="500"
          alt="Hotel Room Main"
          style={{
            borderRadius: '8px',
          }}
        />
        <Image
          src="/desc1.png"
          width="800"
          height="300"
          alt="Hotel Room Main"
        />
      </div>
    </section>
  )
}

export default MainSection
