import { ChangeEvent, useState } from "react";
import styles from "../../scss/Contact.module.scss";
import { Header } from "../Header";
import axios from "axios";
import { ContactThanks } from "../ContactThanks";
import { ContactForm } from "../ContactForm";
export const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validateName, setValidateName] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validateMessage, setValidateMessage] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean>(true);

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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      validateName === true &&
      validateEmail === true &&
      validateMessage === true
    ) {
      setIsSubmitted(true); // Ändrar så att "Tack"-delen poppar upp
      // Skickar till backend som därefter skickar mail till företaget med information
      axios({
        method: "POST",
        url: "http://localhost:8000/email/sendThanks",
        data: {
          name: name,
          email: email,
          message: text,
        },
        // TA BORT DETTA INNAN PRODUKTION, ENDAST FÖR TESTNING AV KONTAKTEMAIL
        // .then((response) => {
        //   if (response.data.status === "success") {
        //     alert("Message Sent.");
        //   } else if (response.data.status === "fail") {
        //     alert("Message failed to send.");
        //   }
        // });
      });
    } else {
      if (validateName === false) {
        setIsNameEmpty(false);
      }
      if (validateEmail === false) {
        setIsEmailEmpty(false);
      }
      if (validateMessage === false) {
        setMessageError(true);
      }
    }
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <Header />
          <div className={styles.mainContentContainer}>
            <div className={styles.contactContainer}>
              {isSubmitted ? ( // Om true, visas tack-delen
                <>
                  <ContactThanks name={name} email={email} />
                </>
              ) : (
                // Om isSubmitted är false, visas kontaktformuläret
                <>
                  <ContactForm
                    name={name}
                    email={email}
                    text={text}
                    handleSubmit={handleSubmit}
                    handleEmail={handleEmail}
                    handleName={handleName}
                    handleText={handleText}
                    validateName={validateName}
                    validateEmail={validateEmail}
                    validateMessage={validateMessage}
                    setValidateName={setValidateName}
                    setValidateEmail={setValidateEmail}
                    setValidateMessage={setValidateMessage}
                    messageError={messageError}
                    setMessageError={setMessageError}
                    isNameEmpty={isNameEmpty}
                    isEmailEmpty={isEmailEmpty}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
