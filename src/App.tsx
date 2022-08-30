import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./scss/App.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/Home";
import { Book } from "./components/pages/Book";
import { Contact } from "./components/pages/Contact";
import { Admin } from "./components/pages/Admin";

function App() {
  const [showGdpr, setShowGdpr] = useState<boolean>(false);

  const removeGdprPopUp = () => {
    localStorage.setItem("GdprStatus", "accepted");
    setShowGdpr(false);
  };

  useEffect(() => {
    let getGdprStatus: string = localStorage.getItem("GdprStatus") || "";
    if (getGdprStatus === "") {
      setShowGdpr(true);
    } else {
      setShowGdpr(false);
    }
  }, []);
  return (
    <>
      {showGdpr && (
        <div className={styles.gdprBackground}>
          <div className={styles.gdprContainer}>
            <div className={styles.gdprTitle}>
              <p>GDPR</p>
            </div>
            <div className={styles.gdprText}>
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
                lobortizzle.
              </p>
            </div>
            <div className={styles.gdprButtonContainer}>
              <div className={styles.readButton} id="gdprReadMore">
                <a href="https://gdpr.eu/" target="_blank">
                  <p>Read more</p>
                </a>
              </div>

              <div
                className={styles.acceptButton}
                onClick={removeGdprPopUp}
                id="gdprAccept"
              >
                <p>Accept</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/book" element={<Book />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
