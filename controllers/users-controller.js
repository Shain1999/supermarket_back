const express = require("express");
const usersLogic = require("../logic/users-logic");

const router = express.Router();

router.post("/login", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
    let userLoginData = request.body;
    try {
        let successfulLoginResponse = await usersLogic.login(userLoginData);
        response.json(successfulLoginResponse);
    }
    catch (e) {
        return next(e)
    }
});
router.post("/", async (request, response, next) => {

    let userData = request.body;
    // defining new signed up user type
    userData.userType = "customer";
    console.log(userData);
    try {
        await usersLogic.addUser(userData);
        response.json("user registered");
    } catch (e) {
        return next(e)
    }



})

router.get("/validateId/:id", async (request, response, next) => {
    let userId = request.params.id;
    try {
        let ans = await usersLogic.isUserExist(userId);
        response.json(ans);
    }
    catch (e) {
        return next(e)
    }
})
router.get("/validateEmail/:email", async (request, response, next) => {
    let email = request.params.email;
    try {
        let ans = await usersLogic.isEmailExist(email);
        response.json(ans);
    }
    catch (e) {
        return next(e)
    }
})
router.get("/userType", async (request, response, next) => {
    let token = request.headers.authorization
    try {
        let userType = await usersLogic.getUserTypeByToken(token);
        response.json(userType);
    }
    catch (e) {
        return next(e)
    }
})
// router.get("/", async (request, response, next) => {
//     try {
//         let ans = await usersLogic.getUsers();
//         response.json(ans);
//     }
//     catch (e) {
//         return next(e)
//     }
// })

module.exports = router;