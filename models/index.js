const User = require('./User');
const Post = require('./Post');
const Book = require('./Book');

User.hasMany(Post, {
    foreignKey: 'user_id',
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.belongsTo(Book, {
    foreignKey: 'book_id'
})

Book.hasMany(Post, {
    foreignKey: 'book_id'
})

module.exports = { User, Post, Book };
