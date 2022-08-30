import styles from "../../scss/Home.module.scss";
import { Header } from "../Header";
import vid from "../../images/videos/home-about-vid.mp4";
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
        <main id="menu" className={styles.menuContainer}>
          <div className={styles.innerMenuContainer}>
            {/* MENU TITLE */}
            <div className={styles.menuTitleContainer}>
              <h3>MENY</h3>
            </div>
            {/* SUBTEXT */}
            <div className={styles.menuSubText}>
              <div className={styles.menuSubLine}></div>
              <p>förrätt</p>
              <div className={styles.menuSubLine}></div>
            </div>
            {/* MENU ITEM 1 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>toast skagen</p>
                <p className={styles.itemsubText}>löfrom</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>139kr</p>
              </div>
            </div>
            {/* MENU ITEM 2 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>s.o.s</p>
                <p className={styles.itemsubText}>smör, ost, sill</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>109kr</p>
              </div>
            </div>
            {/* SUBTEXT */}
            <div className={styles.menuSubText}>
              <div className={styles.menuSubLine}></div>
              <p>huvudrätt</p>
              <div className={styles.menuSubLine}></div>
            </div>
            {/* MENU ITEM 3 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>laxpudding</p>
                <p className={styles.itemsubText}>brynt smör, citron</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>179kr</p>
              </div>
            </div>
            {/* MENU ITEM 4 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>köttbullar</p>
                <p className={styles.itemsubText}>kokt potatis, gräddsås</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>149kr</p>
              </div>
            </div>
            {/* MENU ITEM 5 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>raggmunk</p>
                <p className={styles.itemsubText}>stekt fläsk, lingon</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>165kr</p>
              </div>
            </div>
            {/* MENU ITEM 6 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>flygande jakob</p>
                <p className={styles.itemsubText}>ris</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>179kr</p>
              </div>
            </div>
            {/* SUBTEXT */}
            <div className={styles.menuSubText}>
              <div className={styles.menuSubLine}></div>
              <p>efterrätt</p>
              <div className={styles.menuSubLine}></div>
            </div>
            {/* MENU ITEM 7 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>chokladkaka</p>
                <p className={styles.itemsubText}>cointreaugrädde</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>119kr</p>
              </div>
            </div>
            {/* MENU ITEM 8 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>färska jordgubbar</p>
                <p className={styles.itemsubText}>gräddglass</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>109kr</p>
              </div>
            </div>
            {/* SUBTEXT */}
            <div className={styles.menuSubText}>
              <div className={styles.menuSubLine}></div>
              <p>dryck</p>
              <div className={styles.menuSubLine}></div>
            </div>
            {/* MENU ITEM 9 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>läsk</p>
                <p className={styles.itemsubText}>cola, fanta, sprite</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>39kr</p>
              </div>
            </div>
            {/* MENU ITEM 10 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>vitt vin</p>
                <p className={styles.itemsubText}>mount shizzle, 1904</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>149kr</p>
              </div>
            </div>
            {/* MENU ITEM 11 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>rött vin</p>
                <p className={styles.itemsubText}>nizzle blanc, 1999</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>159kr</p>
              </div>
            </div>
            {/* MENU ITEM 12 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>öl</p>
                <p className={styles.itemsubText}>arboga</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>109kr</p>
              </div>
            </div>
            {/* MENU ITEM 13 */}
            <div className={styles.menuItemContainer}>
              <div className={styles.menuItemLeft}>
                <p className={styles.itemMainText}>bubbel</p>
                <p className={styles.itemsubText}>le facilisizzle, 2006</p>
              </div>
              <div className={styles.menuItemRight}>
                <p>179kr</p>
              </div>
            </div>
          </div>
        </main>
        <main className={styles.aboutContainer}>
          <div className={styles.innerAboutContainer}>
            <div className={styles.aboutTitleContainer}>
              {/* ABOUT TITLE */}
              <h3 id="about">OM OSS</h3>
            </div>
            <div className={styles.aboutTextContainer}>
              {/* ABOUT TEXT */}
              <p>
                Lorizzle break it down dolor sit ma nizzle, consectetuer
                adipiscing dope. Nullizzle dizzle velizzle, aliquet volutpizzle,
                suscipit quis, gravida vizzle, the bizzle. Pellentesque fizzle
                fo shizzle. Sizzle erizzle. Brizzle izzle fizzle we gonna chung
                rizzle tempus tellivizzle. Shiz shut the shizzle up nibh et
                turpizzle. Dang izzle fizzle. Rizzle eleifend fo shizzle mah
                nizzle fo rizzle, mah home g-dizzle. Dang shiz sheezy platea
                izzle. Pot dapibus. Curabitur tellizzle mammasay mammasa mamma
                oo sa, pretizzle eu, mattizzle brizzle, eleifend vitae, nunc.
                Black suscipit. Integizzle sempizzle daahng dawg for sure go to
                hizzle. In that's the shizzle leo yo mamma crazy. Fo shizzle
                sizzle, arcu nizzle shiz facilisizzle, uhuh ... yih! nulla
                hizzle sem, stuff auctizzle yo felis fo shizzle brizzle.
                Suspendisse that's the shizzle ghetto augue. Dope egestas hizzle
                izzle pimpin'. Rizzle consectetizzle blandit sapien. Etizzle for
                sure, dizzle sit we gonna chung accumsan tincidunt, break it
                down sem black sem, the bizzle vestibulum erat nisi sit for sure
                nizzle. Maecenizzle mah nizzle tortor vizzle enim. Phasellus
                lobortizzle.{" "}
              </p>
            </div>
            {/* ABOUT VIDEO TABLET / DESKTOP */}
            <div className={styles.vid}>
              <video autoPlay loop muted>
                <source src={vid} type="video/mp4" />
              </video>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
