const express = require("express");
const categoriesLogic = require("../logic/categories-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {

    try {
        let serverResponse = await categoriesLogic.getAllCategories();
        response.json(serverResponse);
    } catch (e) {
        return next(e)


    }
})
module.exports = router;