const User = require('./User');
const Post = require('./Post');
const Book = require('./Book')

User.hasMany(Post, {
    foreignKey: 'user_id',
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasOne(Book, {
    foreignKey: 'book_title'
})

Book.hasMany(Post, {
    foreignKey: 'book_title'
})

module.exports = { User, Post, Book };
