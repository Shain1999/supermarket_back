const usersDal = require("../dal/users-dal");
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const jwtDecode = require('jwt-decode');
const ServerError = require("../errors/server-error");
const ErrorType = require('../errors/error-types')


// this function generate a token based on user data
async function login(userLoginData) {
    // encrypting password
    userLoginData.password = encryptPassword(userLoginData.password);
    let userData = await usersDal.login(userLoginData);
    // if user failed to connect
    if (!userData) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    // generating a new jwt token based on user data and secret
    const token = jwt.sign({ userId: userData.id, userType: userData.user_type }, config.secret);
    let successfulLoginResponse = { token, firstName: userData.first_name, lastName: userData.last_name,userType:userData.user_type };
    return successfulLoginResponse;
}
// this function encrypt the password without a way to revert back
function encryptPassword(password) {
    const saltRight = "#@$%^!kajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}
// validating user data
function validateUserData(userData) {
    if (!userData.firstName) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'invalid first name');
    }
    if (!userData.password) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'invalid password');
    }
    if (userData.password.length < 6) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'password to short');

    }
    if (userData.password.length > 18) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'password to long');
    }

}
async function addUser(userData) {

    validateUserData(userData);
    // checking if the user name already exist
    if (await usersDal.isUserExist(userData.id)) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    // if the users didnt pass all props normalize data for db
    normalizeOptionalData(userData);
    // encrypting password and generating new id 
    userData.password = encryptPassword(userData.password);
    try {
        await usersDal.addUser(userData);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'err on add', e);

    }



}
async function isUserExist(id) {
    try {
       let usersResponse= await usersDal.isUserExist(id);
        return usersResponse
    } catch (error) {
        throw new ServerError(ErrorType.ID_ALREADY_EXIST);

    }
  }
function normalizeOptionalData(userRegistrationData) {
    if (!userRegistrationData.firstName) {
        userRegistrationData.firstName = "";
    }

    if (!userRegistrationData.lastName) {
        userRegistrationData.lastName = "";
    }
}
async function isEmailExist(email){
    try {
        let usersResponse= await usersDal.isEmailExist(email);
         return usersResponse
     } catch (error) {
         throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
 
     }
}
async function getUserTypeByToken(token) {
    let userId=jwtDecode(token).userId
    try {
        let userType= await usersDal.getUserTypeById(userId);
         return userType
     } catch (error) {
         throw new ServerError(ErrorType.GENERAL_ERROR,'cant get user type');
 
     }
  }
module.exports = {
    login,
    addUser,isUserExist,isEmailExist,getUserTypeByToken
}