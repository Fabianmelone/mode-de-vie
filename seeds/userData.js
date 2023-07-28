const { User } = require('../models');

const userData = [
    {
        username: "Admin",
        email: "admin.adm235@gmail.com",
        password: "admin1234",
        profile_picture: null,
    },
    {
        username: "MarioOF",
        email: "marioOwb254@gmail.com",
        password: "mario1234",
        profile_picture: null,
    },
    {
        username: "AngryGrandpa",
        email: "angrygrandpa3423@gmail.com",
        password: "angrygrandpa1234",
        profile_picture: null,
    },
    {
        username: "halfwayhipser2",
        email: "halwayhipser294@gmail.com",
        password: "halwayhipser1234",
        profile_picture: null, 
    },
    {
        username: "Meghan",
        email: "meghan233423@gmail.com",
        password: "meghan1234",
        profile_picture: null,
    }, 
    {
        username: "Shrek2DvD",
        email: "Shrek2DvD394@gmail.com",
        password: "shrek21234",
        profile_picture: null,
    }, 
    {
        username: "picklejuicer",
        email: "picklejuicer048@gmail.com",
        password: "picklejuicer1234",
        profile_picture: null,
    }, 
    {
        username: "skeeterMcPoo",
        email: "skeetermcpoo4039@gmail.com",
        password: "skeetermcpoo1234",
        profile_picture: null,
    }, 
    {
        username: "ChromieHomie",
        email: "chromiehomie03942@gmail.com",
        password: "chromiehomie1234",
        profile_picture: null,
    }, 
    {
        username: "Amanda",
        email: "amanda4875@gmail.com",
        password: "amanda1234",
        profile_picture: null,
    }, 
    {
        username: "Tyrone",
        email: "tyrone2943@gmail.com",
        password: "tyrone1234",
        profile_picture: null,
    },
    {
        username: "RaccAtacc",
        email: "raccatacc3049@gmail.com",
        password: "angrygrandpa1234",
        profile_picture: null,
    }, 
    {
        username: "ismellcolors",
        email: "ismellcolors20398@gmail.com",
        password: "ismellcolors1234",
        profile_picture: null,
    }, 
    {
        username: "TwinkieEater",
        email: "twinkieeater0394@gmail.com",
        password: "twinkieeater1234",
        profile_picture: null,
    },
    
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;