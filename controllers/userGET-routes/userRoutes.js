
const router = require('express').Router();
const { User, Post } = require('../../models');

// add a verification helper method

// Route to user profile
router.get("/profile", async (req, res) => {

  const username = req.session.username;
  console.log(req.session);
  try {
    const user = await User.findOne({
      where: { username: username },
      include: [{
        model: Post,
      }]
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Assuming you have a user.handlebars file to render the user profile
    const userData = await user.get({ plain: true });
    console.log(userData);
    res.render("user", userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
});




module.exports = router;