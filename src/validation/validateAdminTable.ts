export const validateDate = (date: string) => {
  const regex = new RegExp(
    "/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{4}$/"
  );
  if (regex.test(date) || date) {
    return true;
  } else {
    return false;
  }
};
