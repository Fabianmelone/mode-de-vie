const router = require("express").Router();
const { Post, User, UserSavedPosts } = require("../../models");

router.put('/like', async (req, res) => {
    try {
        var likesNum;
        if (req.body.isLiked === false) {
            likesNum = req.body.likesNum + 1;   //if false, will add a like. if not, it will subtract a like
        } else {
            likesNum = req.body.likesNum - 1;
        }
        const postId = req.body.postId;

        await Post.update({ likes: likesNum }, { where: { id: postId } });  //updates the post
        const updatedData = await Post.findOne({ where: { id: postId } });  //gets the updated post
        const updatedPost = updatedData.get({ plain: true });

        res.json({ likes: updatedPost.likes });

        // console.log(req.body.isLiked);

    } catch (error) {
        res.status(500).json(error);
    }
});




router.post('/save', async (req, res) => {
    try {
        const userId = req.session.userID;
        const postId = req.body.postId;

        const userData = await User.findByPk(userId);
        const postData = await Post.findByPk(postId);


        await userData.addSavedPosts(postData);     // addSavedPosts to add to the user's saved posts.
        // "add" and "get" are sequelize methods: addPosts, and getPosts.
        // in our models/index.js, we set aliases for the belongsToMany methods. Setting alias' makes it easier to differentiate. we set it as "SavedPosts", so we can use "addSavedPosts()" instead of "addPosts()"

        const savedPosts = await userData.getSavedPosts();
        const savedPostsPlain = savedPosts.map(post => post.get({ plain: true }));

        console.log(savedPostsPlain);
        res.json(savedPostsPlain);


    } catch (error) {
        console.log(error); // log the error
        res.status(500).json(error);
    }
});

module.exports = router;