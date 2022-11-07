import { createClient } from 'contentful'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ContentList from '../../components/Category/ContentList'
import Navbar from '../../components/menu/Navbar'
import Sidebar from '../../components/menu/Sidebar'
import MenuIcon from '../../components/menuIcon/MenuIcon'
import styles from '../../styles/Category.module.scss'

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

    return {
      props: {
        menu: mainMenu
      }
    }
}

function Category({ menu, artworks }) {
    const router = useRouter()
    const [ mobileMenu, setMobileMenu ] = useState(false)

    const activeCategory = menu.items[0].fields.menuItems.find(i => (
        i.fields.sectionTitle.toLowerCase().replace(' ', '') === router.query.category
    ))
    return (
        <div className={styles.category}>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            </Head>
            <div className={styles.menuIcon}>
                <MenuIcon
                    onClick={() => setMobileMenu(true)}
                />
            </div>
            <Sidebar
                logo={menu.items[0].fields.menuLogo.fields}
                menuItems={menu.items[0].fields.menuItems}
            />
            <div className={`${mobileMenu ? styles.mobileNavbar : styles.hide}`}>
                <Navbar
                    logo={menu.items[0].fields.menuLogo.fields}
                    menuItems={menu.items[0].fields.menuItems}
                    startBigLogo={true}
                    closeOption={() => setMobileMenu(false)}
                    showCloseButton={true}
                    background={menu.items[0].fields.mobileBackground}
                />
            </div>
            <ContentList content={activeCategory} />
        </div>
    )
}

export default Category
