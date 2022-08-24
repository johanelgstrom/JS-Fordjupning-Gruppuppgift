import { ChangeEvent, useState } from "react";
import { send } from "emailjs-com";
import styles from "../../scss/Contact.module.scss";
import vid from "../../images/videos/contact-confirm-vid.mp4";
import { Header } from "../Header";
export const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <Header />
          <div className={styles.mainContentContainer}>
            {" "}
            <div className={styles.contactContainer}>
              {isSubmitted ? (
                <>
                  {" "}
                  <div className={styles.confirmContainer}>
                    <div className={styles.confirmTitle}>
                      <p>Tack {name}</p>
                    </div>
                    <div className={styles.confirmText}>
                      <p>Vi kontaktar dig så snart som möjligt på {email}</p>
                    </div>
                    <div className={styles.confirmVid}>
                      <video autoPlay loop muted>
                        <source src={vid} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </>
              ) : (
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
                          id=""
                          placeholder={email}
                          onChange={handleEmail}
                          required
                        />
                      </div>
                      <div className={styles.labelInputContainer}>
                        <textarea
                          name="text"
                          placeholder={text}
                          onChange={handleText}
                          required
                        ></textarea>
                      </div>

                      <button type="submit">Skicka</button>
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
