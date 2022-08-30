import { ChangeEvent, useState } from "react";
import styles from "../../scss/Contact.module.scss";
import vid from "../../images/videos/contact-confirm-vid.mp4";
import { Header } from "../Header";
import axios from "axios";
export const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Hanterar variabeln för namn
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  // Hanterar variabeln för email
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  // Hanterar variabeln för text
  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  // Hanterar skicka
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsSubmitted(true); // Ändrar så att "Tack"-delen poppar upp
    // Skickar till backend som därefter skickar mail till företaget med information
    axios({
      method: "POST",
      url: "http://localhost:8000/contact/send",
      data: {
        name: name,
        email: email,
        message: text,
      },
    });
    // TA BORT DETTA INNAN PRODUKTION, ENDAST FÖR TESTNING AV KONTAKTEMAIL
    // .then((response) => {
    //   if (response.data.status === "success") {
    //     alert("Message Sent.");
    //   } else if (response.data.status === "fail") {
    //     alert("Message failed to send.");
    //   }
    // });
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <Header />
          <div className={styles.mainContentContainer}>
            {" "}
            <div className={styles.contactContainer}>
              {isSubmitted ? ( // Om true, visas tack-delen
                <>
                  {" "}
                  <div className={styles.confirmContainer}>
                    <div className={styles.confirmTitle}>
                      <p id="confirmTitle">Tack {name}</p>
                    </div>
                    <div className={styles.confirmText}>
                      <p id="confirmText">
                        Vi kontaktar dig så snart som möjligt på {email}
                      </p>
                    </div>
                    <div className={styles.confirmVid}>
                      <video autoPlay loop muted>
                        <source src={vid} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </>
              ) : (
                // Om isSubmitted är false, visas kontaktformuläret
                <>
                  <div className={styles.contactTitleContainer}>
                    <h3>Fyll i vårt kontaktformulär!</h3>
                  </div>
                  <div className={styles.contactFormContainer}>
                    <form target="_blank" onSubmit={handleSubmit}>
                      <div className={styles.labelInputContainer}>
                        <div className={styles.labelContainer}>
                          <p>Namn</p>
                        </div>
                        <input
                          type="text"
                          name="name"
                          placeholder={name}
                          onChange={handleName}
                          id="name"
                          required
                        />
                      </div>
                      <div className={styles.labelInputContainer}>
                        <div className={styles.labelContainer}>
                          <p>Email</p>
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder={email}
                          onChange={handleEmail}
                          required
                        />
                      </div>
                      <div className={styles.labelInputContainer}>
                        <textarea
                          name="text"
                          id="text"
                          placeholder={text}
                          onChange={handleText}
                          required
                        ></textarea>
                      </div>

                      <button type="submit" id="submitContact">
                        Skicka
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
