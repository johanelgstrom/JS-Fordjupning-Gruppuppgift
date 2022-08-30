import { HashLink as Link } from "react-router-hash-link";
import styles from "./../scss/Header.module.scss";
export const Header = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link to={"/"} className={styles.linkTag}>
            <h1>MATAD</h1>
          </Link>
        </div>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/#menu" className={styles.linkTag} id="menuButton">
                <p>Meny</p>
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link to="/book" className={styles.linkTag} id="bookButton">
                <p>Boka</p>
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link to="/contact" className={styles.linkTag} id="contactButton">
                <p>Kontakt</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
