const { expressjwt: expressJwt } = require('express-jwt');
const config = require("../config/config.json")
const { secret } = config
function loginFilter() {
    return expressJwt({
        secret, algorithms: ["HS256"], credentialsRequired: false,
    }).
    // unless({
    //     path: [
    //         { url: "/users", method: "POST" },
    //         { url: "/users/login", method: "POST" },
    //         { url: '/users/validateId/', method: "GET" }
    //     ]
    // });
    unless({ path: ["/users/validateId","/users","/users/login","/users/validateEmail"] })
};


module.exports = loginFilter