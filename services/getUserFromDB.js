const { User } = require('../models/user'); 

async function getUserFromDB(phoneNumber) {
    const user = await User.findOne({phoneNumber: phoneNumber})
    return user;
}

module.exports = getUserFromDB;