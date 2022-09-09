import { Header } from "../Header";
import styles from "../../scss/NotFound.module.scss";

export const NotFound = () => {
  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <Header />
        </div>
        <div className={styles.heroTextContainer}>
          <div className={styles.heroTextInnerContainer}>
            <h3>404</h3>
            <p>Sidan kunde inte hittas</p>
          </div>
        </div>
      </main>
    </>
  );
};
