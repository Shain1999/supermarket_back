
const express = require("express");
const ordersLogic = require("../logic/orders-logic");

const router = express.Router();

router.get("/isOrderDate/:date", async (request, response, next) => {
    let date = request.params.date;

    try {
        let dateValid = await ordersLogic.isDateValid(date);
        response.json(dateValid);
    } catch (e) {
        return next(e)

    }
})
router.post("/", async (request, response, next) => {
    let orderObj = request.body;
    let token = request.headers.authorization;
    try {
        await ordersLogic.addOrder(token, orderObj);
        response.json('added');
    } catch (e) {
        return next(e)
    }
})
module.exports = router;