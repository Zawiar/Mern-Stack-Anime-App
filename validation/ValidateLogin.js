const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateLogin(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field must not be empty";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least six characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field must not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
