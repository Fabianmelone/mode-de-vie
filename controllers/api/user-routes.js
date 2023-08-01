const router = require("express").Router();
const { User, Follower_User } = require("../../models");
//still need to add authorization method

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      // If the user is not found, send an error response
      return res
        .status(400)
        .json({ message: "User not found. Please check your email." });
    }

    // console.log(userData);
    const isPasswordValid = await userData.validPassword(req.body.password);
    if (!isPasswordValid) {
      // If the password is incorrect, send an error response
      return res
        .status(400)
        .json({ message: "Incorrect password. Please try again." });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.userID = userData.id;
      req.session.loggedIn = true;
      req.session.username = userData.username;

      // console.log(userData);
      // console.log(req.session);

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/follow/:username", async (req, res) => {
  const { username } = req.params;
  const followerUsername = req.session.username;

  try {
    // Find the user being followed
    const userToFollow = await User.findOne({ where: { username } });

    // Find the user who wants to follow
    const follower = await User.findOne({
      where: { username: followerUsername },
    });

    // If either user is not found, return 404 error
    if (!userToFollow || !follower) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if follow relationship already exists
    const existingFollow = await Follower_User.findOne({
      where: { user_id: userToFollow.id, follower_id: follower.id },
    });

    // If the follow relationship already exists, show an error
    if (existingFollow) {
      return res.status(400).json({ error: "Already following this user" });
    }

    // Create the follow relationship in the follower_user table
    await Follower_User.create({
      user_id: userToFollow.id,
      follower_id: follower.id,
    });

    // Update follower counts for both users
    await User.increment("followers", { where: { id: userToFollow.id } });
    await User.increment("following", { where: { id: follower.id } });

    // Return success message
    return res.status(200).json({ message: "Successfully followed user." });
  } catch (err) {
    console.log("Error : ");
    console.error(err);
    console.log("==============");
    return res.status(500).json({ error: "Something went wrong." });
  }
});

router.post("/unfollow/:username", async (req, res) => {
  const { username } = req.params;
  const followerUsername = req.session.username;

  try {
    // Find the user being unfollowed
    const userToUnfollow = await User.findOne({ where: { username } });

    // Find the user who wants to unfollow
    const follower = await User.findOne({
      where: { username: followerUsername },
    });

    // If either user is not found, return 404 error
    if (!userToUnfollow || !follower) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the unfollow relationship exists
    const existingUnfollow = await Follower_User.findOne({
      where: { user_id: userToUnfollow.id, follower_id: follower.id },
    });

    // If the unfollow relationship does not exist, show an error
    if (!existingUnfollow) {
      return res.status(400).json({ error: "Not following this user" });
    }

    // Remove the unfollow relationship from the follower_user table
    await Follower_User.destroy({
      where: { user_id: userToUnfollow.id, follower_id: follower.id },
    });

    // Decrement the follower count for the user being unfollowed
    await User.decrement("followers", { where: { id: userToUnfollow.id } });

    // Decrement the following count for the user who is unfollowing
    await User.decrement("following", { where: { id: follower.id } });

    // Return success message
    return res.status(200).json({ message: "Successfully unfollowed user." });
  } catch (err) {
    console.error(err);
    // Error
    return res.status(500).json({ error: "Something went wrong." });
  }
});

router.post("/logout", async (req, res) => {
  try {
    //still need to create a session, and have a loggedIn parameter
    if (req.session.loggedIn) {
      //checks if req.session.loggedIn is true. If so, it will destroy the session.
      req.session.destroy(() => {
        res.status(200).end(); // uses .end() to end the response process successfully with 200 status.
      });
    } else {
      res.status(404).end(); //ends the response process with a 404 error
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const signupData = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });

    // console.log(signupData);
    req.session.save(() => {
      req.session.user_id = signupData.id;
      req.session.userID = signupData.id;
      req.session.loggedIn = true;
      req.session.username = signupData.username;

      // console.log(signupData);
      res.status(200).json(signupData);
      // res.redirect("/login");
    });
  } catch (error) {
    // Handle the error (e.g., render the signup page with an error message)
    // console.error("Error creating a new user:", error);
    res.status(500).json(error);
    // res.render("signup", { errorMessage: "Failed to create a new user" });
  }
});

module.exports = router;
