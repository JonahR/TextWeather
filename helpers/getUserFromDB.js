const { User } = require('../models/user'); 

const DEFAULT_USER_OBJECT = {metric: false, description: true, temp: true, notRegistered: true}

async function getUserFromDB(phoneNumber) {
    return User.findOne({phoneNumber: phoneNumber})
        .then(result => {
            if(result) {
                return result.toObject()
            } else {
                return DEFAULT_USER_OBJECT;
            }
        })
        .catch(error => {throw error});
}

module.exports = getUserFromDB;