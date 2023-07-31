
const router = require('express').Router();
const { User, Post, Follower_User } = require('../../models');

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

// Route to display page with users that current user is following and also the top three posts of the user being followed
router.get("/followingPage", async (req, res) => {
  try {
    // getting the current user through session
    const currentUser = req.session.user;

    // Find all the followers for the current user
    const following_users = await Follower_User.findAll({
      where: { follower_id: currentUser.id },
      include: {
        model: User,
        // alias follower to represent follower which is current user
        as: 'follower',
        // include the attributes you want to display in the template
        attributes: ['id', 'username', 'profile_picture'],
      },
    });

    // fetching top three posts of each user that the current user follows
    const userPostsWithLikes = await Promise.all(
      following_users.map(async (followingUser) => {
        const posts = await Post.findAll({
          // use the followers id to fetch posts
          where: { user_id: followingUser.follower.id },
          order: [['likes', 'DESC']],
          limit: 3,
          // include the image_url attribute only
          attributes: ['image_url'],
        });
        return { user: followingUser.follower, posts};
      })
    );

    // render the followinPage template
    res.render('followingPage', { userPostsWithLikes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong.' });
  }
});



module.exports = router;