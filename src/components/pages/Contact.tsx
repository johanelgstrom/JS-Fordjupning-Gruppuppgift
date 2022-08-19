import { ChangeEvent, useState } from "react";
import styles from "../../scss/Contact.module.scss";
export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <div className={styles.emptyBox}></div>
          <div className={styles.contactContainer}>
            <div className={styles.contactTitleContainer}>
              <h3>Fyll i vårt kontaktformulär!</h3>
            </div>
            <div className={styles.contactFormContainer}>
              <form action="">
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

                <button>Skicka</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
