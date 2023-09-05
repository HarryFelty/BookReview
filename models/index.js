const User = require('./User');
const Car = require('./Post');

User.hasMany(Car, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Car };
