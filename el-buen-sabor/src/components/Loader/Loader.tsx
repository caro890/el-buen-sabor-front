import styles from "../../styles/Loader.module.css"

export const Loader = () => {
  return (
    <div className={styles.main}>
        <div className={styles.uloading}>
            <div className={styles.uloading__symbol}>
                <img src="src/img/logoBackgroundRemoved.png" />
            </div>
        </div>
    </div>
  )
}
