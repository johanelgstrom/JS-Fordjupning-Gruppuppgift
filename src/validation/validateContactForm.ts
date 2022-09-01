// Validerar om namnet är 2 bokstäver eller mer
export const validateContactName = (name: string) => {
  if (name.length > 1) {
    return true;
  } else {
    return false;
  }
};
// Validerar om emailen är en riktigt emailadress
export const validateContactEmail = (email: string) => {
  const regex = new RegExp(".+@.+..+");
  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
};
// Validerar så att meddelandet har ett innehåll
export const validateMessage = (
  text: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (text.length > 0) {
    setErrorMessage(false);
    return true;
  } else {
    return false;
  }
};
