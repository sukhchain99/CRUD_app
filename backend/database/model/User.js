const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
    user_name: {
        type: String
    },
    user_email: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', User)