const router = require("express").Router();
const { Post, User, UserSavedPosts, Comment, Follower_User } = require("../../models");

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

// Route to follow a user
router.post('/follow/:username', async (req, res) => {
    const { username } = req.params;
    const { followerUsername } = req.body; 

    try {
        // Look for the user being followed
        const userToFollow = await User.findByUsername(username);

        // Look for the user who wants to follow
        const follower = await User.findByUsername(followerUsername);

        // if not found error
        if (!userToFollow || !follower) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if follow relationship already exists
        const existingFollow = await Follower_User.findOne({
            where: { user_id: userToFollow.id, follower_id: follower.id },
        });

        // if yes, show error that user is already being followed by you
        if (existingFollow) {
            return res.status(400).json({ error: 'Already following this user' });
        }

        // Create the follow relationship in the follower_user table
        await Follower_User.create({
            user_id: userToFollow.id,
            follower_id: follower.id,
        });

        // The followercount will be updated in both the user table for both users
        await User.increment('followers', { where: { id: userToFollow.id } });
        await User.increment('following', { where: { id: follower.id } });

        // success message
        return res.status(200).json({ message: 'Successfully followed user.' });
    } catch (err) {
        console.error(err);
        // error
        return res.status(500).json({ error: 'Something went wrong.' });
    } 
});

router.post('/comments', async (req, res) => {
    try {
        const comment = req.body.comment_id;
        const newComment = await Comment.create({
            ...req.body,
            userID: req.session.userID,
            comment_id: comment,
        });
        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;