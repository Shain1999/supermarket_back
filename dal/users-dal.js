const connection = require("./dbconfig");
const ErrorType = require('../errors/error-types')

const ServerError = require("../errors/server-error");

async function login(user) {
    let sql = `SELECT * from users where email = ? and password = ?`;
    let parameters = [user.email, user.password];
    let [userData] = await connection.executeWithParameters(sql, parameters);
    if (!userData) {
        return null;
    }
    return userData;
}
async function isUserExist(id) {
    let sql = "SELECT id from users where id = ?";
    let parameters = [id];
    try {
        let users = await connection.executeWithParameters(sql, parameters);
        if (users && users.length > 0) {
            return true;
        }
        return false;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
}
async function isEmailExist(email) {
    let sql = `select email from users where email=?`
    let parameters = [email];
    let users = await connection.executeWithParameters(sql, parameters);
    try {
        if (users && users.length > 0) {
            return true;
        }
        return false;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
}
async function addUser(userData) {
    let sql = `insert into users(id,first_name, last_name, email, password,city,street, user_type)` + `values(?, ?, ?, ?, ?, ?,?,?)`;
    let parameters = [userData.id, userData.firstName, userData.lastName, userData.email, userData.password, userData.city, userData.street, userData.userType]
    try {
        await connection.executeWithParameters(sql, parameters)
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
}
async function getUserTypeById(id) {
    let sql = `select user_type from users where id=?`
    let parameters = [id]
    try {
        let userType = await connection.executeWithParameters(sql, parameters)
        return userType
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
}

// async function getUserByUserName(userName) {
//     let sql = `SELECT * FROM users where username = ?`;
//     let parameters = userName;
//     let [userData] = await connection.executeWithParameters(sql, parameters);

//     if (!userData) {
//         throw new Error("no user with that name");

//     }
//     return userData;
// }
module.exports = {
    login,
    isUserExist,
    addUser, isEmailExist,getUserTypeById
}