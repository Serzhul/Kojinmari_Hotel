'use client'
import Image from 'next/image'
import Navbar from '@components/Navbar'
import styled from '@emotion/styled'

function Home() {
  return (
    <div>
      <Header className="pt-4 flex items-center justify-between relative">
        <Image
          src="/logo.png"
          alt="Hotel Logo"
          width="150"
          height="150"
        ></Image>
        <Navbar />
      </Header>
      <main>
        {/* Section 1*/}
        <section
          className="relative"
          style={{
            width: '100%',
            height: '80vh',
            backgroundImage: `url('/bg-white.jpeg')`,
          }}
        >
          <SectionImageWrapper>
            <Image
              src="/hotel_room_main.jpeg"
              width="400"
              height="300"
              alt="Hotel Room Main"
              style={{
                marginTop: '100px',
                borderRadius: '8px',
                marginRight: '15px',
                zIndex: '2',
              }}
            />
            <div>
              <Image
                src="/desc_title1.png"
                width="500"
                height="300"
                alt="Hotel Room Main"
              />
              <Image
                src="/desc_text1.png"
                width="500"
                height="300"
                alt="Hotel Room Main"
              />
            </div>
          </SectionImageWrapper>
        </section>

        {/* Section 2*/}
        <section
          className="relative"
          style={{
            width: '100%',
            height: '80vh',
            backgroundImage: `url('/bg-black.jpeg')`,
          }}
        >
          <SectionImageWrapper>
            <div
              style={{
                paddingTop: '150px',
              }}
            >
              <Image
                src="/desc_title2.png"
                width="300"
                height="300"
                alt="Hotel Room Main"
              />
              <Image
                src="/desc_text2.png"
                width="700"
                height="500"
                alt="Hotel Room Main"
              />
            </div>
            <ImageWrapper>
              <Image
                src="/hotel_room_2.jpeg"
                alt="Hotel Room Main"
                layout="fill"
                objectFit="cover"
                style={{
                  borderRadius: '8px',
                }}
              />
            </ImageWrapper>
          </SectionImageWrapper>
        </section>

        {/* Section 3 */}
        <section
          className="relative"
          style={{
            width: '100%',
            height: '80vh',
            backgroundImage: `url('/hotel_room_bg.jpeg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
          }}
        >
          <div
            className="flex items-center relative"
            style={{
              width: '1300px',
              margin: '0 auto',
            }}
          >
            <div className="pt-36 pl-20">
              <Image
                src="/desc_title3.png"
                width="300"
                height="300"
                alt="Hotel Room Main"
              />
              <Image
                src="/desc_text3-1.png"
                width="300"
                height="300"
                alt="Hotel Room Main"
              />
              <Image
                src="/desc_text3-2.png"
                width="400"
                height="400"
                alt="Hotel Room Main"
              />
            </div>
          </div>
        </section>
        <Footer>
          <FooterMenus>
            <FooterMenu>사업자 등록번호 000-00-00000</FooterMenu>
            <FooterMenu>(주) 코진마리 호텔 대표이사 서대원</FooterMenu>
            <FooterMenu>TEL: 02) 0000-0000</FooterMenu>
            <FooterMenu>개인정보보호 책임자: 서대원</FooterMenu>
          </FooterMenus>
        </Footer>
      </main>
    </div>
  )
}

export default Home

const Header = styled.header`
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 8;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 5px;
`

const SectionImageWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 1300px;
  margin: 0 auto;
`

const ImageWrapper = styled.div`
  position: absolute;
  width: 700px;
  height: 500px;
  top: 50px;
  right: -150px;

  @media screen and (max-width: 762px) {
    width: 500px;
    height: 500px;
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
`

const FooterMenus = styled.div`
  display: flex;
  justify-content: space-between;
`
const FooterMenu = styled.div`
  font-size: 1.2rem;
  margin-right: 5rem;
`
