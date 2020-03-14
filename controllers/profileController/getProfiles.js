//REQUIRED FILES
const Profiles = require("../../modals/Profiles");
const Users = require("../../modals/Users");

//GETS ALL PROFILES
exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profiles.find().populate("user", ["name"]);
    if (profiles.length === 0) {
      return res.status(404).json({ error: "Profiles not found" });
    }

    return res.json(profiles);
  } catch (err) {
    return res.status(404).json({ error: "Profile not found" });
  }
};

//GET PROFILE BY USERNAME
exports.getProfileByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await Users.findOne({ name: username });
    if (user) {
      const profile = await Profiles.findOne({
        user: user._id
      }).populate("user", ["name"]);

      if (profile) {
        return res.json(profile);
      }
    }

    return res.status(404).json({ error: "No profile found by that username" });
  } catch (err) {
    return res.status(404).json({ error: "Profile not found" });
  }
};

//GET PROFILE BY USERID
exports.getProfileById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const profile = await Profiles.findOne({ user: userId }).populate("user", [
      "name"
    ]);

    if (profile) {
      return res.json(profile);
    }

    return res
      .status(404)
      .json({ error: "Profile not found with that userId" });
  } catch (err) {
    return res.status(404).json({ error: "Profile not found" });
  }
};

//GET CURRENT PROFILE
exports.getCurrentProfile = async (req, res, next) => {
  try {
    const profile = await Profiles.findOne({
      user: req.user.id
    }).populate("user", ["name"]);

    if (profile) {
      return res.json(profile);
    }

    return res.status(404).json({ error: "Profile not found" });
  } catch (err) {
    return res.status(404).json({ error: "Profile not found" });
  }
};
