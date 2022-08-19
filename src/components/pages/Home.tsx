import styles from "../../scss/Home.module.scss";
export const Home = () => {
  return (
    <>
      <main className={styles.mainContainer}></main>
      <main id="menu" className={styles.menuContainer}>
        <div className={styles.innerMenuContainer}></div>
      </main>
      <main className={styles.aboutContainer}>
        <div className={styles.innerAboutContainer}>
          <div className={styles.aboutTitleContainer}>
            <h3 id="about">OM OSS</h3>
          </div>
          <div className={styles.aboutTextContainer}>
            <p>
              Lorizzle break it down dolor sit ma nizzle, consectetuer
              adipiscing dope. Nullizzle dizzle velizzle, aliquet volutpizzle,
              suscipit quis, gravida vizzle, the bizzle. Pellentesque fizzle fo
              shizzle. Sizzle erizzle. Brizzle izzle fizzle we gonna chung
              rizzle tempus tellivizzle. Shiz shut the shizzle up nibh et
              turpizzle. Dang izzle fizzle. Rizzle eleifend fo shizzle mah
              nizzle fo rizzle, mah home g-dizzle. Dang shiz sheezy platea
              izzle. Pot dapibus. Curabitur tellizzle mammasay mammasa mamma oo
              sa, pretizzle eu, mattizzle brizzle, eleifend vitae, nunc. Black
              suscipit. Integizzle sempizzle daahng dawg for sure go to hizzle.
              In that's the shizzle leo yo mamma crazy. Fo shizzle sizzle, arcu
              nizzle shiz facilisizzle, uhuh ... yih! nulla hizzle sem, stuff
              auctizzle yo felis fo shizzle brizzle. Suspendisse that's the
              shizzle ghetto augue. Dope egestas hizzle izzle pimpin'. Rizzle
              consectetizzle blandit sapien. Etizzle for sure, dizzle sit we
              gonna chung accumsan tincidunt, break it down sem black sem, the
              bizzle vestibulum erat nisi sit for sure nizzle. Maecenizzle mah
              nizzle tortor vizzle enim. Phasellus lobortizzle.{" "}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};
