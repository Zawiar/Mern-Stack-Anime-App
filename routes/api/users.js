const router = require("express").Router();
const passport = require("passport");

///////////////////////////// User Controller methods /////////////////////////
const {
  getAllUsers,
  getCurrentUser
} = require("../../controllers/usersController/getUsersController");

const {
  registerUser
} = require("../../controllers/usersController/RegisterController");

const {
  loginUser
} = require("../../controllers/usersController/authController");

const {
  addfollower,
  unfollow
} = require("../../controllers/usersController/followerController");

//////////////////////////////////////////////////////////////////////////////////

//GET ALL USERS
router.route("/all").get(getAllUsers);

//REGISTER USER
router.route("/register").post(registerUser);

//LOGIN USER
router.route("/login").post(loginUser);

//GET CURRENT USER
router
  .route("/current")
  .get(passport.authenticate("jwt", { session: false }), getCurrentUser);

//ADD FOLLOWER
router
  .route("/follow")
  .put(passport.authenticate("jwt", { session: false }), addfollower);

//UNFOLLOW
router
  .route("/unfollow")
  .put(passport.authenticate("jwt", { session: false }), unfollow);

module.exports = router;
