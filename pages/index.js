import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { createClient } from 'contentful'
import Menu from '../components/menu/Menu'
import styled from 'styled-components'
import Navbar from '../components/menu/Navbar'

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const mainMenu = await client.getEntry('sQMtxAiUaQEdmNdhiriWI')

  return {
    props: {
      menu: mainMenu
    }
  }
}

const Container = styled.div`
  position: relative;

  .mobile-wrapper {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;

    @media (min-width: 912px) {
      display: none;
    }
  }

  .desktop-navbar {
    @media (max-width: 912px) {
      display: none;
    }
  }
`

export default function Home({ menu }) {
  return (
    <Container>
      <Head>
        <title>Holie</title>
        <meta name="description" content="Holie - Tatto Artist, Graffiti Writer and Designer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <main className={styles.main}>
        <div className="mobile-wrapper">
          <Navbar
            logo={menu.fields.menuLogo.fields}
            menuItems={menu.fields.menuItems}
            startBigLogo
            closeOption={() => {console.log('Changing Page')}}
            mobileSlideshow={true}
            background={menu.fields.mobileBackground}
          />
        </div>
        <div className="desktop-wrapper">
          <Navbar
            logo={menu.fields.menuLogo.fields}
            menuItems={menu.fields.menuItems}
            showCloseButton={false}
            background={menu.fields.mobileBackground}
            closeOption={() => {console.log('Changing Page')}}
          />
        </div>
        <Menu menuItems={menu.fields.menuItems} />
      </main>
    </Container>
  )
}
