import styles from "./../scss/Header.module.scss";
export const Header = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <h1>MATAD</h1>
        </div>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/#menu">Meny</a>
            </li>
            <li className={styles.navItem}>
              <a href="/book">Boka</a>
            </li>
            <li className={styles.navItem}>
              <a href="/contact">Kontakt</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
