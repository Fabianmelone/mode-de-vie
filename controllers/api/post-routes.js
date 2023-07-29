const router = require("express").Router();
const { Post, User } = require("../../models");

router.put('/like', async (req, res) => {
    try {
        const likesNum = req.body.likesNum + 1;
        const postId = req.body.postId;

        await Post.update({ likes: likesNum }, { where: { id: postId } });

        const updatedData = await Post.findOne({ where: { id: postId } });

        const updatedPost = updatedData.get({ plain: true });



        // 53001

        res.json({ likes: updatedPost.likes });





        console.log(updatedPost);

    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;