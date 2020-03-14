//REQUIRED FILES
const Profiles = require("../../modals/Profiles");
const Users = require("../../modals/Users");

//VALIDATION
const ValidateProfile = require("../../validation/ValidateProfile");

//CREATE or UPDATE PROFILE
exports.createProfile = async (req, res, next) => {
  try {
    //SET PROFILE FIELDS
    const { errors, isValid } = ValidateProfile(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    //Hobbies and place it in an array
    if (typeof req.body.hobbies !== "undefined") {
      profileFields.hobbies = req.body.hobbies.split(",");
    }

    //social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    const profile = await Profiles.findOne({ user: req.user.id });
    //console.log(profileFields);
    if (profile) {
      //UPDATE PROFILE

      req.body.youtube
        ? (profileFields.social.youtube = req.body.youtube)
        : (profileFields.social.youtube = profile.social.youtube);
      req.body.twitter
        ? (profileFields.social.twitter = req.body.twitter)
        : (profileFields.social.twitter = profile.social.twitter);
      req.body.linkedin
        ? (profileFields.social.linkedin = req.body.linkedin)
        : (profileFields.social.linkedin = profile.social.linkedin);
      req.body.facebook
        ? (profileFields.social.facebook = req.body.facebook)
        : (profileFields.social.facebook = profile.social.facebook);
      req.body.instagram
        ? (profileFields.social.instagram = req.body.instagram)
        : (profileFields.social.instagram = profile.social.instagram);
      console.log(profileFields);

      const profileAfterUpdate = await profile.updateOne({
        $set: profileFields
      });

      return res.json(profileAfterUpdate);
    } else {
      //Save Profile
      console.log(profileFields);
      const newProfile = await new Profiles(profileFields).save();
      return res.json(newProfile);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addAnimanga = async (req, res, next) => {
  try {
    if (
      typeof req.body.priorityLevel !== Number &&
      req.body.priorityLevel < 0 &&
      req.body.priorityLevel > 10
    ) {
      return res
        .status(400)
        .json({ error: "Priority Level should be a Integer" });
    }

    const profile = await Profiles.findOne({ user: req.user.id });
    if (profile) {
      const {
        title,
        synopsis,
        image,
        priorityLevel,
        watched,
        typeofMaterial,
        mal_id
      } = req.body;
      const newAnimanga = {
        title,
        synopsis,
        image,
        priorityLevel,
        watched,
        typeofMaterial,
        mal_id
      };

      profile.animanga.unshift(newAnimanga);

      const profileafterAnimanga = profile.save();
      return res.json(profileafterAnimanga);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateAnimanga = async (req, res, next) => {
  try {
    const { animanga_id } = req.params;
    const profile = await Profiles.findOne({ user: req.user.id });
    if (profile) {
      const IndexanimangatoBeupdate = profile.animanga
        .map(item => item.id)
        .indexOf(animanga_id);

      const original = profile.animanga[IndexanimangatoBeupdate];

      if (req.body.priorityLevel)
        original.priorityLevel = req.body.priorityLevel;

      if (req.body.watched) original.watched = req.body.watched;

      profile.animanga[IndexanimangatoBeupdate] = original;

      const yes = await profile.save();
      return res.send(yes);
    }
    return res.status(400).json({ error: "Profile not found" });
  } catch (err) {
    console.log(err);
  }
};

//Delete Animanga
exports.deleteAnimanga = async (req, res, next) => {
  try {
    const profile = await Profiles.findOne({ user: req.user.id });

    //GET THE INDEX OF THE ITEM TO BE REMOVED
    const removeIndex = profile.animanga
      .map(item => item.id)
      .indexOf(req.params.animanga_id);

    //REMOVE IT FROM THE ARRAY
    profile.animanga.splice(removeIndex, 1);
    const profileafterAnimanga = profile.save();
    return res.json(profileafterAnimanga);
  } catch (err) {
    console.log(err);
  }
};

//DELETE PROFILE AS WELL AS USER
exports.deleteProfile = async (req, res, next) => {
  await Profiles.findOneAndRemove({ user: req.user.id });
  await Users.findOneAndRemove({ _id: req.user.id });
  return res.json({ Success: "Profile and User Deleted Succesfully" });
};
