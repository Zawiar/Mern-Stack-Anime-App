// REQUIRED FILES
const Users = require("../../modals/Users");
const bcrypt = require("bcryptjs");

//Validation
const validateRegister = require("../../validation/ValidateRegister");

//PUBLIC
//REGISTER A USER
exports.registerUser = async (req, res, next) => {
  try {
    const { isValid, errors } = validateRegister(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { name, email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      errors.email = "Email already exists!";
      return res.status(400).json(errors);
    }

    const userwithSameName = await Users.findOne({ name });
    if (userwithSameName) {
      errors.name = "Username already exists! Please select a new one";
      return res.status(400).json(errors);
    }
    const newUser = new Users({
      name,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        try {
          newUser.password = hash;
          const user = await newUser.save();
          return res.json(user);
        } catch (err) {
          console.log(err);
        }
      });
    });
  } catch (err) {
    console.log(err);
    next();
  }
};
