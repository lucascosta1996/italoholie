import styles from './MenuIcon.module.scss'

function MenuIcon({ onClick }) {
    return(
        <label className={styles.menuIcon} for="check" onClick={() => onClick()}>
            <input className={styles.menuIconInput} type="checkbox" id="check"/> 
            <span></span>
            <span></span>
            <span></span>
        </label>
    )
}

export default MenuIcon
