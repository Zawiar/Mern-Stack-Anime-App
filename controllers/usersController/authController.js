// REQUIRED FILES
const Users = require("../../modals/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Validaton
const validateLogin = require("../../validation/ValidateLogin");

//PUBLIC
//LOGIN A USER
exports.loginUser = async (req, res, next) => {
  try {
    const { isValid, errors } = validateLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      errors.email = "User not found!";
      return res.status(400).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.password = "Incorrect Password";
      return res.status(400).json(errors);
    }

    const payload = {
      id: user.id,
      name: user.name
    };

    jwt.sign(
      payload,
      process.env.SecretOrKey,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ success: true, token: "Bearer " + token });
      }
    );
  } catch (err) {
    console.log(err);
    next();
  }
};
