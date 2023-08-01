const router = require("express").Router();
const { Post, User, UserSavedPosts, Comment, Follower_User } = require("../../models");
const withAuth = require("../../utils/auth");

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
        var isSaved = req.body.isSaved;
        
        const userData = await User.findByPk(userId);
        const postData = await Post.findByPk(postId);
        console.log(isSaved);
        try {
            if (isSaved === true) {
                console.log(true);
                await userData.removeSavedPosts(postData); // Remove post if it's already saved
            } else {
                console.log(false);
                await userData.addSavedPosts(postData); // Save post if it's not already saved
            }
        
            var savedPosts = await userData.getSavedPosts({});
            // console.log(savedPosts);
        
            const savedPostsPlain = savedPosts.map(post => post.get({ plain: true }));
        
            console.log(savedPostsPlain);
            res.json(savedPostsPlain);
        } catch (error) {
            res.status(500).json(error);
        }
        



    } catch (error) {
        console.log(error); // log the error
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.body.comment_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;