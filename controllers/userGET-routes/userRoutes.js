
const router = require('express').Router();
const { User, Post, Follower_User } = require('../../models');

const withAuth = require("../../utils/auth");

// Route to user profile
router.get("/:username", withAuth, async (req, res) => {
  try {
    // Get the username from the request params
    const username = req.params.username;

    // Find the user by their username
    const user = await User.findByUsername(username);

    if (!user) {
      // Redirect the user to the homepage if the user doesn't exist
      return res.redirect("/");
    }

    // Find all posts belonging to the user
    const userPosts = await Post.findAll({ where: { user_id: user.id } });

    // Render the profile page and pass the user's information and posts to it
    res.render("user", {
      user: user.get({ plain: true }),
      posts: userPosts.map((post) => post.get({ plain: true })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to local user profile
router.get("/", withAuth, async (req, res) => {
  try {
    // Get the username from the session request
    const username = req.session.username;

    // Find the user by their username
    const user = await User.findByUsername(username);

    if (!user) {
      // Redirect the user to the homepage if the user doesn't exist
      return res.redirect("/");
    }

    let userPosts, userFollowingPosts, userSavedPosts;

    if (user.id) {
      // Find all posts belonging to the user
      userPosts = await Post.findAll({ where: { user_id: user.id } });
    }

    if (user.followingIds) {
      // Find posts from users the current user is following
      userFollowingPosts = await Post.findAll({ where: { user_id: user.followingIds } });
    }

    if (user.savedPostIds) {
      // Find posts that the user has saved
      userSavedPosts = await Post.findAll({ where: { id: user.savedPostIds } });
    }

    // Convert sequelize object to plain JavaScript object
    const userData = user.get({ plain: true });
    const postsData = userPosts ? userPosts.map((post) => post.get({ plain: true })) : [];
    const followingPostsData = userFollowingPosts ? userFollowingPosts.map((post) => post.get({ plain: true })) : [];
    const savedPostsData = userSavedPosts ? userSavedPosts.map((post) => post.get({ plain: true })) : [];

    console.log(postsData);
    // Render the profile page and pass the user's information and posts to it
    res.render("localuser", {
      user: userData,
      userPosts: postsData,
      userFollowingPosts: followingPostsData,
      userSavedPosts: savedPostsData,
    });
  } catch (error) {
    // Log and handle the error
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
        return { user: followingUser.follower, posts };
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