const express = require("express");
const productsLogic = require("../logic/products-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {

    try {
        let serverResponse = await productsLogic.getAllProducts();
        response.json(serverResponse);
    } catch (e) {
        return next(e)

    }
})
router.post("/", async (request, response, next) => {
    let productObj = request.body;
    let token = request.headers.authorization;
    try {
        productsLogic.addProduct(productObj, token);
        response.json('added product');
    } catch (e) {
        return next(e)

    }
})
router.put("/", async (request, response, next) => {
    let productObj = request.body;
    let token = request.headers.authorization;
    try {
        await productsLogic.updateProduct(productObj, token);
        response.json('updated product');
    } catch (e) {
        return next(e)

    }
})
module.exports = router;