import { createClient } from 'contentful'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/menu/Navbar'
import Sidebar from '../components/menu/Sidebar'
import MenuIcon from '../components/menuIcon/MenuIcon'
import AboutContent from '../components/About/About'

export async function getServerSideProps() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })
  
    const mainMenu = await client.getEntries({
        content_type: "menu",
        limit: 1,
        include: 10
    })

    const about = await client.getEntries({
        content_type: "about"
    })

    console.log(`ABOUT`, about)

    return {
      props: {
        menu: mainMenu,
        about: about
      }
    }
}

const CategoryWrapper = styled.div`
    display: flex;
    padding-left: 230px;

    @media (max-width: 912px) {
        padding-left: 0;
    }

    .mobile-navbar {
        position: fixed;
        left: 0;
        z-index: 9;
        width: 100%;
        height: 100%;

        @media (min-width: 912px) {
            display: none;
        }
    }

    .hide {
        display: none;
    }

    .menu-icon {
        position: fixed;
        right: 25px;
        top: 25px;
        z-index: 5;
    }
`

function About({ menu, about }) {
    const router = useRouter()
    const [ mobileMenu, setMobileMenu ] = useState(false)
    console.log('MENU', menu)
    console.log('ABOUT', about)

    return (
        <CategoryWrapper>
            <div className="menu-icon">
                <MenuIcon
                    onClick={() => setMobileMenu(true)}
                />
            </div>
            <Sidebar
                logo={menu?.items[0].fields.menuLogo.fields}
                menuItems={menu?.items[0].fields.menuItems}
            />
            <div className={`${mobileMenu ? 'mobile-navbar ' : 'hide'}`}>
                <Navbar
                    logo={menu?.items[0].fields.menuLogo.fields}
                    menuItems={menu?.items[0].fields.menuItems}
                    startBigLogo={true}
                    closeOption={() => setMobileMenu(false)}
                />
            </div>
            <AboutContent content={about} />
            {/* <ContentList content={activeCategory} /> */}
        </CategoryWrapper>
    )
}

export default About
