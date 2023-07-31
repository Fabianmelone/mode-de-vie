
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

router.get("/followingPage", async (req, res) => {
  try {
    const currentUser = req.user;

    const follower_users = await Follower_User.findAll({
      where: { follower_id: currentUser.id },
      include: {
        model: User,
        as: user,
        attributes: ['id', 'username', 'profile_picture'],
      },
    });

    const userPostsWithLikes = await Promise.all(
      follower_users.map(async (followerUser) => {
        const posts = await Post.findAll({
          where: { user_id: followerUser.user.id },
          order: [['likes', 'DESC']],
          limit: 3,
          attributes: ['image_url'],
        });
        return { user: followerUser.user, posts};
      })
    );

    res.render('followingPage', { userPostsWithLikes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong.' });
  }
});



module.exports = router;