import React, { useState } from 'react'
import MenuItem from './MenuItem'
import styles from './Menu.module.scss'

export default function Menu({ menuItems }) {
    const [isMenuOpen, setMenuOpen] = useState(null)
    return (
        <div className={styles.menu}>
            {menuItems.map((menuItem, index) => {
                return (
                    <MenuItem
                        key={menuItem.fields.sectionTitle}
                        title={menuItem.fields.sectionTitle}
                        background={menuItem.fields.color}
                        image={menuItem.fields.sectionImage.fields}
                        id={index}
                        setMenuOpen={() => setMenuOpen(index)}
                        isMenuOpen={isMenuOpen === index}
                    />
                )
            })}
        </div>
    )
}
