const router = require("express").Router();
const {
  Post,
  User,
  UserSavedPosts,
  Comment,
  Follower_User,
} = require("../../models");

// Like Post
router.put("/like", async (req, res) => {
  try {
    var likesNum;
    if (req.body.isLiked === false) {
      likesNum = req.body.likesNum + 1; //if false, will add a like. if not, it will subtract a like
    } else {
      likesNum = req.body.likesNum - 1;
    }
    const post_id = req.body.post_id;

    await Post.update({ likes: likesNum }, { where: { id: post_id } }); //updates the post
    const updatedData = await Post.findOne({ where: { id: post_id } }); //gets the updated post
    const updatedPost = updatedData.get({ plain: true });

    res.json({ likes: updatedPost.likes });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Save Post
router.post("/save", async (req, res) => {
  try {
    const userId = req.session.user_id;
    const post_id = req.body.post_id;

    var isSaved = req.body.isSaved;

    const userData = await User.findByPk(userId);
    const postData = await Post.findByPk(post_id);
    try {
      if (isSaved === true) {
        await userData.removeSavedPosts(postData); // Remove post if it"s already saved
      } else {
        await userData.addSavedPosts(postData); // Save post if it"s not already saved
      }

      var savedPosts = await userData.getSavedPosts({});

      const savedPostsPlain = savedPosts.map((post) =>
        post.get({ plain: true })
      );

      res.json(savedPostsPlain);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Comments
router.post("/comments", async (req, res) => {
  try {
    const message = req.body.message;
    const newComment = await Comment.create({
      userID: req.session.userID,
      message: message,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new post
router.post("/create", async (req, res) => {
  try {
    const { title, description, image_url } = req.body;

    // Validate required fields
    if (!title || !image_url) {
      return res
        .status(400)
        .json({ error: "Title and image URL are required." });
    }

    // Other validation checks if needed
    const user_id = req.session.user_id;

    // Create a new post in the database
    const newPost = await Post.create({
      title,
      description,
      image_url,
      user_id,
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post." });
  }
});

module.exports = router;
