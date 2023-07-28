const { Post } = require('../models');

const postData = [
    {
        title: "Dog memes",
        description: "Those dogs look hillarious, lmao",
        image_url: "dog-memes.png",
        likes: 53.000,
        saves: 15.000,
        views: 234.000,
        user_id: 7,
    },
    {
        title: "Shrek Screaming",
        description: "Ma man is scared",
        image_url: "shrek.png",
        likes: 38.000,
        saves: 26.000,
        views: 362.000,
        user_id: 2,
    },
    {
        title: "Selfie",
        description: "Good morning everyone",
        image_url: "grandpa.png",
        likes: 3.000,
        saves: 300,
        views: 24.000,
        user_id: 3,
    },
    {
        title: "Nemo in the bronx",
        description: "NYC is wildin",
        image_url: "nemo-bronx.png",
        likes: 589.000,
        saves: 345.000,
        views: 209.000,
        user_id: 2,
    }, 
    {
        title: "Crazy Baby",
        description: "this baby looks wild",
        image_url: "baby-chat.png",
        likes: 38.000,
        saves: 26.000,
        views: 362.478,
        user_id: 13,
    },
    {
        title: "Life as a software developer",
        description: "Even google figured out my misery",
        image_url: "no-b.png",
        likes: 674.000,
        saves: 245.000,
        views: 947.084,
        user_id: 9,
    },
    {
        title: "LMAO",
        description: "This got me dead",
        image_url: "pros.png",
        likes: 784.000,
        saves: 578.000,
        views: 989.000,
        user_id: 14,
    },
    {
        title: "Go Brandon go!",
        description: "So proud of my son",
        image_url: "soccer.png",
        likes: 23.000,
        saves: 12.000,
        views: 32.000,
        user_id: 10,
    }, 
    {
        title: "Latte Love",
        description: "How to start the morning beautifully",
        image_url: "coffee-art.png",
        likes: 356.000,
        saves: 234.000,
        views: 564.000,
        user_id: 4,
    },
    {
        title: "Viva La Pasta",
        description: "Click the link in my bio to make those beautiful Tuscan Butter Gnocchi",
        image_url: "gnocchi.png",
        likes: 543.000,
        saves: 43.000,
        views: 785.000,
        user_id: 5,
    }, 
    {
        title: "Space-raccoon",
        description: "Midjourney is creating some cool images for us",
        image_url: "gnocchi.png",
        likes: 467.000,
        saves: 234.000,
        views: 984.000,
        user_id: 1,
    },
    {
        title: "Space-raccoon",
        description: "Midjourney is creating some cool images for us",
        image_url: "gnocchi.png",
        likes: 467.000,
        saves: 234.000,
        views: 984.000,
        user_id: 1,  
    }, 
    {
        title: "Trolling a monkey",
        description: "He didn't see that one coming lol",
        image_url: "trick-monkey.png",
        likes: 678.000,
        saves: 234.000,
        views: 986.000,
        user_id: 11,
    },
    {
        title: "Trolling a monkey",
        description: "He didn't see that one coming lol",
        image_url: "trick-monkey.png",
        likes: 678.000,
        saves: 234.000,
        views: 986.000,
        user_id: 11,
    },
    {
        title: "DEV",
        description: "This is a simple placeholder post image, this image will be replaced by whatever the user would like to post.",
        image_url: "dev.png",
        likes: 24.300,
        saves: 1.600,
        views: 110.200,
        user_id: 1, 
    }
    
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;