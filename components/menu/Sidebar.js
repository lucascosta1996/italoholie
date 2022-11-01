import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Sidebar.module.scss'

function Sidebar({ logo, menuItems }) {
    const router = useRouter()

    return(
        <div className={styles.sidebar}>
            <div className={styles.logoContainer}>
              <Image
                  src={`https:${logo.file.url}`}
                  alt="Picture of the author"
                  height={logo.file.details.image.height}
                  width={logo.file.details.image.width}
                  layout="responsive"
                  priority
              />
            </div>
            <ul className={styles.menuItems}>
                {menuItems.map((menuItem) => {
                    const ROUTE_NAME = menuItem.fields.sectionTitle.toLowerCase().replace(' ', '-')
                    return (
                        <li
                            key={menuItem.fields.sectionTitle}
                            className={router.query.category === ROUTE_NAME ? `${styles.active}` : ''}
                        >
                            <Link
                                href={{
                                    pathname: '/[category]',
                                    query: { category: ROUTE_NAME }
                                }}
                            >
                                {`// ${menuItem.fields.sectionTitle}`}
                            </Link>
                        </li>
                    )
                })}
                <li
                    className={router.asPath === "/about" ? `${styles.active}` : ''}
                >
                    <Link
                        href="/about"
                    >
                        About
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
