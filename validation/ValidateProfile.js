const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateProfile(data) {
  const errors = {};

  data.hobbies = !isEmpty(data.hobbies) ? data.hobbies : "";

  if (Validator.isEmpty(data.hobbies)) {
    errors.hobbies = "Hobbies are Required";
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a Valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a Valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a Valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a Valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a Valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
