//Required Files
const Users = require("../../modals/Users");

exports.addfollower = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    const followeduser = await Users.findById(req.body.userId);
    if (user) {
      const found = user.following.filter(
        user => user.userId.toString() === req.body.userId
      );

      if (found.length !== 0) {
        return res.status(400).json({ error: "Already in follow list" });
      }
      user.following = user.following.push({
        userId: req.body.userId,
        username: followeduser.name
      });
      const userafterFollowingAdded = await user.updateOne({
        $set: user
      });
      res.json({ success: "Succesfully followed" });
    }

    if (followeduser) {
      followeduser.followers = followeduser.followers.push({
        userId: req.user.id,
        username: req.user.name
      });
      const userafterFollowing = await followeduser.updateOne({
        $set: followeduser
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    const followeduser = await Users.findById(req.body.userId);
    let isExisingInFollowing = user.following.findIndex(
      currentUser =>
        currentUser.userId.toString() === req.body.userId.toString()
    );
    if (isExisingInFollowing < 0) {
      return res.json({ error: "You are not following" });
    }

    user.following.splice(isExisingInFollowing, 1);
    await user.save();

    let isExisingInFollowers = followeduser.followers.findIndex(
      followUser => followUser.userId.toString() === req.user.id.toString()
    );
    followeduser.followers.splice(isExisingInFollowers, 1);
    await followeduser.save();

    res.json({ message: "Unfollowed" });
  } catch (err) {
    console.log(err);
  }
};
