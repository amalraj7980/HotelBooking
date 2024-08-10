const validateEmail = (email) => {
    var reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email); 
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\(\d{3}\)\s?\d{3}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

function isResponseIsValid(response) {
  if (response.status === 200 || response.status === 201) {
    return true;
  } else {
    return false;
  }
}

export {
  validateEmail,
  validatePhoneNumber,
  isResponseIsValid,
};
