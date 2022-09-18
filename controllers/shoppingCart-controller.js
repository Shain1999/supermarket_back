const express = require("express");
const shoppingCartLogic = require("../logic/shoppingCart-logic");

const router = express.Router();

router.get("/", async (request, response, next) => {
    let token = request.headers.authorization;

    try {
        let shoppingCart = await shoppingCartLogic.getShoppingCartByUserId(token);
        response.json(shoppingCart);
    } catch (e) {
        return next(e)

    }
})
router.get("/items", async (request, response, next) => {
    let token = request.headers.authorization;

    try {
        let shoppingCartItems = await shoppingCartLogic.getAllItemsInShoppingCart(token);
        response.json(shoppingCartItems);
    } catch (e) {
        return next(e)

    }
})
router.get("/isOrderDate/:date", async (request, response, next) => {
    let date = request.params.date;

    try {
        let dateValid = await shoppingCartLogic.isDateValid(date);
        response.json(dateValid);
    } catch (e) {
        return next(e)

    }
})
router.get("/items/sum", async (request, response, next) => {
    let token = request.headers.authorization;
    try {
        let totalCartPrice = await shoppingCartLogic.getTotalSumOfCartByToken(token);
        response.json(totalCartPrice);
    } catch (e) {
        return next(e)
    }
})
router.post("/", async (request, response, next) => {
    let addToCartObj = request.body;
    try {
        await shoppingCartLogic.addItemToCart(addToCartObj);
        response.json('added');
    } catch (e) {
        return next(e)

    }
})
router.post("/cart", async (request, response, next) => {
    let token = request.headers.authorization;
    try {
        await shoppingCartLogic.createNewCartForUserByToken(token);
        response.json('created');
    } catch (e) {
        return next(e)

    }
})
router.put("/items", async (request, response, next) => {
    let updateItemObj = request.body;
    try {
        await shoppingCartLogic.updateCartItem(updateItemObj);
        response.json('updated');
    } catch (e) {
        return next(e)

    }
})
router.delete("/:cartItemId", async (request, response, next) => {
    let cartItemId = request.params.cartItemId;
    try {
        await shoppingCartLogic.deleteCartItem(cartItemId);
        response.json('deleted');
    } catch (e) {
        return next(e)

    }
})
router.delete("/clean/cart", async (request, response, next) => {

    let token = request.headers.authorization;
    console.log(token);
    try {
        await shoppingCartLogic.cleanShoppingCartAfterOrder(token);
        response.json('clean');
    } catch (e) {
        return next(e)

    }
})


module.exports = router;