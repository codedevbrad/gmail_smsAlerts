
const Users = require('./service.model');

// === IN-APP : user sigmnup == //

function getUserFromDB ( ) {
    return Users.findById( { _id: req.user._id } )
                .select('-password');
}

function getUsersFromDB ( ) {
    return Users.find( )
                .select('-password')
}

function updateUserToken ( accessObj ) {
    return Users.findByIdandUpdate( { _id: req.user._id } , { access : accessObj } , { new : true } )
}

async function awaitgetUsers ( ) {
    try {
        return await Users.find().select('access phoneNumber');
    }
    catch( err ) {
        throw new Error( err );
    }
}

// == IN-APP : user features == //

function updateUserFromDB ( user , object ) {
    return Users.findByIdandUpdate( { _id: user } , object , { new : true } ).select('-password');
}

// ===== SERVERLESS ===== //

const getUsersToken = ( ) => {
    return Users.find( )
                .select('access phoneNumber senders emailparsed');
}

const updateUsersenders = ( id , object ) => {
    return Users.findByIdandUpdate(  { _id: id } , { senders : object } , { new : true } )
}

// === ERROR CATCHING === //

const findId_error = async ( id ) => {
    return Users.findById( { number : '12' } )
}

module.exports.userUpdates = {
    updateUserFromDB
}


module.exports.userQueries__server = {
    getUsersFromDB , getUserFromDB , updateUserToken , awaitgetUsers
}

module.exports.userQueries__serverless = {
    getUsersToken , updateUsersenders
}

module.exports.userQueries__errorProne = {
    findId_error
}
