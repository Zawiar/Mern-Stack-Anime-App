//Required Files
const Users = require("../../modals/Users");

//PUBLIC
//GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find().select([
      "name",
      "email",
      "createdAt",
      "_id",
      "followers",
      "following"
    ]);
    if (users.length > 0) {
      return res.json(users);
    } else {
      return res.status(404).json({ error: "No Users found!" });
    }
  } catch (err) {
    console.log(err);
    return next();
  }
};

//PRIVATE
//GET CURRENT USER
exports.getCurrentUser = (req, res, next) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    createdAt: req.user.createdAt
  });
  next();
};
