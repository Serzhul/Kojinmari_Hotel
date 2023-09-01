'use client'
import Image from 'next/image'
import styled from '@emotion/styled'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

function Home() {
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const sectionImages: Element[] = gsap.utils.toArray('.section-image')

    sectionImages.forEach((section, idx) => {
      gsap.fromTo(
        section,
        {
          x: -400,
        },
        {
          x: 0,
          duration: 1,
          delay: ((idx + 1) % 3) * 0.2,
          scrollTrigger: {
            trigger: section,
            toggleActions: 'play reset play reset',
          },
        },
      )
    })
  }, [])

  return (
    <MainContainer>
      {/* Section 1*/}
      <SectionContainer1>
        <HotelImageWrapper1 className="section-image">
          <Image
            src="/hotel_room_main.jpeg"
            layout="fill"
            objectFit="cover"
            alt="Hotel Room Main"
          />
        </HotelImageWrapper1>
        <TextImageWrapper1>
          <Image
            className="section-image"
            src="/desc_title1.png"
            width="500"
            height="400"
            alt="Hotel Room Main"
          />
          <Image
            className="section-image"
            src="/desc_text1.png"
            width="500"
            height="400"
            alt="Hotel Room Main"
          />
        </TextImageWrapper1>
      </SectionContainer1>

      {/* Section 2*/}
      <SectionContainer2>
        <TextImageWrapper2>
          <Image
            className="section-image"
            src="/desc_title2.png"
            width="500"
            height="120"
            alt="Hotel Room Main"
          />
          <Image
            className="section-image"
            src="/desc_text2.png"
            width="589"
            height="196"
            alt="Hotel Room Main"
          />
        </TextImageWrapper2>
        <HotelImageWrapper2 className="section-image">
          <Image
            src="/hotel_room_2.jpeg"
            alt="Hotel Room Main"
            layout="fill"
            objectFit="cover"
          />
        </HotelImageWrapper2>
      </SectionContainer2>

      {/* Section 3 */}
      <SectionContainer3>
        <ImageWrapper3>
          <Image
            src="/desc_title3.png"
            width="300"
            height="300"
            alt="Hotel Room Main"
            className="section-image"
          />
          <Image
            src="/desc_text3-1.png"
            width="300"
            height="300"
            alt="Hotel Room Main"
            className="section-image"
          />
          <Image
            src="/desc_text3-2.png"
            width="300"
            height="300"
            alt="Hotel Room Main"
            className="section-image"
          />
        </ImageWrapper3>
        <div></div>
      </SectionContainer3>
      <Footer>
        <FooterMenus>
          <FooterMenu>사업자 등록번호 000-00-00000</FooterMenu>
          <FooterMenu>(주) 코진마리 호텔 대표이사 서대원</FooterMenu>
          <FooterMenu>TEL: 02) 0000-0000</FooterMenu>
          <FooterMenu>개인정보보호 책임자: 서대원</FooterMenu>
        </FooterMenus>
      </Footer>
    </MainContainer>
  )
}

export default Home

const MainContainer = styled.main`
  width: 100vw;
  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;
  }
`

const SectionContainer1 = styled.section`
  width: 100%;
  height: 100vh;
  background-image: url('/bg-white.jpeg');
  position: relative;

  @media (max-width: 1000px) {
    height: 90vh;
  }
  @media (max-width: 700px) {
    height: 80vh;
  }
`

const SectionContainer2 = styled.section`
  width: 100%;
  height: 100vh;
  background-image: url('/bg-black.jpeg');
  position: relative;
  z-index: 3;

  @media (max-width: 1000px) {
    height: 90vh;
  }

  @media (max-width: 700px) {
    height: 70vh;
  }
`

const SectionContainer3 = styled.section`
  width: 100%;
  height: 80vh;
  background-image: url('/hotel_room_bg.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  position: relative;

  @media (max-width: 1000px) {
    height: 40vh;
  }
`

const HotelImageWrapper1 = styled.div`
  position: absolute;
  max-width: 98rem;
  width: 40%;
  height: 100%;
  border-radius: 8px;

  @media (max-width: 1000px) {
    top: 36rem;
    left: 12rem;
    width: 70%;
    height: 60%;
  }

  @media (max-width: 700px) {
    top: 22rem;
    left: 6rem;
    width: 70%;
    height: 55%;
  }
`

const TextImageWrapper1 = styled.div`
  position: absolute;
  max-width: 98rem;
  height: 80%;
  top: 25rem;
  left: 60rem;

  @media (max-width: 1000px) {
    width: 70%;
    top: 9rem;
    left: 18rem;
  }

  @media (max-width: 700px) {
    width: 70%;
    top: 8rem;
    left: 8rem;
  }
`

const TextImageWrapper2 = styled.div`
  position: absolute;
  top: 12rem;
  left: 12rem;

  @media (max-width: 1000px) {
    width: 60%;
    top: 5rem;
    left: 18rem;
  }

  @media (max-width: 700px) {
    width: 70%;
    top: 3rem;
    left: 6rem;
  }
`

const HotelImageWrapper2 = styled.div`
  position: absolute;
  width: 40%;
  height: 80%;
  top: 0.5rem;
  right: 0.5rem;

  @media (max-width: 1000px) {
    width: 70%;
    height: 60%;
    top: 36rem;
    left: 12rem;
  }

  @media (max-width: 700px) {
    width: 60%;
    height: 60%;
    top: 22rem;
    left: 8rem;
  }
`

const ImageWrapper3 = styled.div`
  position: absolute;
  width: auto;
  height: 80%;
  top: 10rem;
  left: 15rem;

  @media (max-width: 1000px) {
    width: 60%;
    top: 5rem;
    left: 10rem;
  }

  @media (max-width: 700px) {
    width: 36%;
    top: 5rem;
    left: 12rem;
  }
`

const Footer = styled.footer`
  width: 100%;
  height: 20vh;
  background-color: #272727;
  color: #999;
  border-top: 1px solid #c8c8c8;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    height: 10vh;
  }

  @media (max-width: 700px) {
    height: 100%;
  }
`

const FooterMenus = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`
const FooterMenu = styled.div`
  font-size: 1.2rem;
  margin-right: 5rem;

  @media (max-width: 1000px) {
    margin-right: 2.5rem;
  }

  @media (max-width: 700px) {
    margin-right: 2rem;
    font-size: 0.8rem;
  }
`
