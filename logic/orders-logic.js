const ordersDal = require("../dal/orders-dal");
const ServerError = require("../errors/server-error")
const ErrorType = require("../errors/error-types")
const jwtDecode = require('jwt-decode');


async function isDateValid(date) {
    try {
        let ordersOnDate = await ordersDal.getAllOrdersOnDate(date)
        if (ordersOnDate.length >= 3) {
            return false;
        }
        return true

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function addOrder(token,orderObj) {
    let userId=jwtDecode(token).userId;
    orderObj.userId=userId;
    if (validateOrderData(orderObj)) {
        try {
            await ordersDal.addOrder(orderObj);
        } catch (error) {
            throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
        }
    }
    
}
function validateOrderData(ordersObj) {
    if (ordersObj.userId == null) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'some paramater is null')
    }
    if (ordersObj.cartId == null) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'some paramater is null')
    }
    if (ordersObj.totalSum == null) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'some paramater is null')
    }
    if (ordersObj.city == null) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'some paramater is null')
    }
    if (ordersObj.street == null) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'some paramater is null')
    }
    if (ordersObj.date == null) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'some paramater is null')
    }
    if (ordersObj.orderDate == null) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'some paramater is null')
    }
    if (ordersObj.paymentInfo == null) {
        throw new ServerError(ErrorType.GENERAL_ERROR, 'some paramater is null')
    }
    return true
}
module.exports = { isDateValid ,addOrder}