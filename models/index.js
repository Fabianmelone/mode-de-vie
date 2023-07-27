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

User.belongsToMany(Follower, { through: Follower_User, onDelete: 'CASCADE'});
Follower.belongsToMany(User, { through: Follower_User, onDelete: 'CASCADE'});

module.exports = { Comment, Gallery, Post, User };