const router = require("express").Router();
const User = require("../../models/User");
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

    console.log(userData);
    const isPasswordValid = await userData.validPassword(req.body.password);
    if (!isPasswordValid) {
      // If the password is incorrect, send an error response
      return res
        .status(400)
        .json({ message: "Incorrect password. Please try again." });
    }

    req.session.save(() => {
      req.session.userID = userData.id;
      req.session.loggedIn = true;

      // console.log(userData);
      console.log(req.session.loggedIn);

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.status(500).json(error);
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

    console.log(signupData);
    req.session.save(() => {
      req.session.userID = signupData.id;
      req.session.loggedIn = true;

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
