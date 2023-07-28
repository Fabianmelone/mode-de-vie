
const router = require('express').Router();
const  {User, Post}  = require('../../models');



// add a verification helper method

// Route to user profile
router.get("/:username", async (req, res) => {

    const username = req.params.username;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).send("User not found");
      }
      // Assuming you have a user.handlebars file to render the user profile
      const userData = {
        username: user.username,
      };
      console.log(userData);
      res.render("user", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send("Internal Server Error");
    }
  });



  
module.exports = router;