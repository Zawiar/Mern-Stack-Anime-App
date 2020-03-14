//REQUIRED FILES
const passport = require("passport");
const router = require("express").Router();

//Methods from profile controller
const {
  getCurrentProfile,
  getProfileByUsername,
  getProfileById,
  getProfiles
} = require("../../controllers/profileController/getProfiles");

const {
  createProfile,
  addAnimanga,
  deleteAnimanga,
  deleteProfile,
  updateAnimanga
} = require("../../controllers/profileController/createProfile");

//routes

//GET CURRENT PROFILE
router
  .route("/profiles/current")
  .get(passport.authenticate("jwt", { session: false }), getCurrentProfile);

//GET ALL PROFILES
router.route("/profiles").get(getProfiles);

//GET PROFILE BY ID
router.route("/profiles/:userId").get(getProfileById);

//GET PROFILE BY USERNAME
router.route("/profiles/username/:username").get(getProfileByUsername);

//POST METHOD
//CREATE OR UPDATE PROFILE
router
  .route("/profile")
  .post(passport.authenticate("jwt", { session: false }), createProfile);

//ADD NEW ANIMANGA
router
  .route("/profile/animanga")
  .post(passport.authenticate("jwt", { session: false }), addAnimanga);

//DELETE or UPDATE ANIMANGA
router
  .route("/profile/animanga/:animanga_id")
  .put(passport.authenticate("jwt", { session: false }), updateAnimanga)
  .delete(passport.authenticate("jwt", { session: false }), deleteAnimanga);

//DELETE PROFILE AND USER
router
  .route("/profile")
  .delete(passport.authenticate("jwt", { session: false }), deleteProfile);

module.exports = router;
