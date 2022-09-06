export const validateBookingName = (name: string) => {
  if (name.length > 1 || name === "") {
    return true;
  } else {
    return false;
  }
};

export const validateBookingEmail = (email: string) => {
  const regex = new RegExp(".+@.+..+");
  if (regex.test(email) || email === "") {
    return true;
  } else {
    return false;
  }
};

export const validateBookingPhone = (phone: string) => {
  const regex = new RegExp("[+]46[7]([0-9]*){7}[0-9]$");
  if (regex.test(phone) || phone === "") {
    return true;
  } else {
    return false;
  }
};

export const validateAll = (
  validateEmail: boolean,
  validateName: boolean,
  validatePhone: boolean,
  customerInformation: { name: string; email: string; phone: string }
) => {
  if (
    validateEmail &&
    validateName &&
    validatePhone &&
    customerInformation.name !== "" &&
    customerInformation.email !== "" &&
    customerInformation.phone !== ""
  )
    return true;
};
