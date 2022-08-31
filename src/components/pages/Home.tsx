import styles from "../../scss/Home.module.scss";
import { About } from "../About";
import { Header } from "../Header";
import { Menu } from "../Menu";
export const Home = () => {
  return (
    <>
      <main className={styles.mainContainer}>
        <Header />
        <div className={styles.heroTextContainer}>
          <p>est. 2013</p>
        </div>
      </main>
      <div className={styles.menuAboutContainer}>
        <Menu />
        <About />
      </div>
    </>
  );
};
