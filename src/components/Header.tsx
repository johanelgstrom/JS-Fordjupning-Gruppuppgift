import { HashLink as Link } from "react-router-hash-link";
import styles from "./../scss/Header.module.scss";
export const Header = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        {/* LOGO */}
        <div className={styles.logoContainer}>
          <Link to={"/"} className={styles.linkTag}>
            <h1>MATAD</h1>
          </Link>
        </div>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            {/* HEADER LIST ITEM 1 */}
            <li className={styles.navItem}>
              <Link to="/#menu" className={styles.linkTag} id="menuButton">
                <p>Meny</p>
              </Link>
            </li>
            {/* HEADER LIST ITEM 2 */}
            <li className={styles.navItem}>
              <Link to="/book" className={styles.linkTag} id="bookButton">
                <p>Boka</p>
              </Link>
            </li>
            {/* HEADER LIST ITEM 3 */}
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
