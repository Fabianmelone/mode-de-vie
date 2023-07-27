const Comment = require('./Comment');
const Gallery = require('./Gallery');
const Post = require('./Post');
const User = require('./User');
const Follower = require('./Follower');
const Follower_User = require('./Follower-User');

Gallery.hasMany(Post, {
    foreignKey: 'gallery_id',
});

Post.belongsTo(Gallery, {
    foreignKey: 'gallery_id',
})

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})


/* 
Define a many-to-many relationship between User and User (self referencing)
Here, 'User' is treated as two separate entities. One is being 'followed' and 
the other is doing the 'following'. The as: 'Followers' property gives an alias to 
the relation when we are looking for all the followers of a user.
The 'through' property tells sequelize to use the FollowerUser model as the join 
table to make this many-to-many relationship.
The 'foreignKey' property is the foreign key that the FollowerUser model will 
use to join with the User model.
The 'otherKey' property is the foreign key that the FollowerUser model will 
use to join with the other instance of User model (in this case, followers). 
*/

User.belongsToMany(User, { 
    as: 'Followers', 
    through: Follower_User,
    foreignKey: 'user_id', 
    otherKey: 'follower_id' 
});

User.belongsToMany(User, { 
    as: 'Following', 
    through: Follower_User, 
    foreignKey: 'follower_id', 
    otherKey: 'user_id' 
});

module.exports = { Comment, Gallery, Post, User, Follower_User };