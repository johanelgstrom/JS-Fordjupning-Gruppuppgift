import { Outlet } from "react-router-dom";
import styles from "./scss/Layout.module.scss";

export const Layout = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <h1>MATAD</h1>
        </div>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>Meny</li>
            <li className={styles.navItem}>Boka</li>
            <li className={styles.navItem}>Kontakt</li>
          </ul>
        </div>
      </div>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};
