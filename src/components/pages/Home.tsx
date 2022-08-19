import styles from "../scss/Home.module.scss";
export const Home = () => {
  return (
    <>
      <main className={styles.mainContainer}>
        <div>tänk er den första bilden här</div>
      </main>
      <main className={styles.menuContainer}>
        <div className={styles.innerMenuContainer}></div>
      </main>
      <main className={styles.aboutContainer}>
        <div className={styles.innerAboutContainer}></div>
      </main>
    </>
  );
};
