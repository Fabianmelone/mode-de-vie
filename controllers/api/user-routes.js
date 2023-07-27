const router = require('express');

const { User } = require('../../models/User');
//still need to add authorization method

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });    //finds a user where its username is the same as the username in the request body.

        const passwordData = userData.checkPass(req.body.password); //calls the checkPass function to verify if the password is correct.
        //stores its callbak to the 'passwordData' const

        if(!userData || !passwordData){
            res.status(400).json({message: 'username or password incorrect! try again.'})
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
})