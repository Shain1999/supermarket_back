const connection = require('./dbconfig');

const ServerError = require("../errors/server-error")
const ErrorType = require("../errors/error-types")

async function addOrder(orderObj) {
    console.log(orderObj);
    let sql = `insert into orders(user_id,cart_id,final_price,delivery_city,delivery_street,delivery_date,order_date,payment_info)` +
        `values(?,?,?,?,?,?,?,?)`
    let parameters = [orderObj.userId, orderObj.cartId, orderObj.totalSum, orderObj.city, orderObj.street, orderObj.date, orderObj.orderDate, orderObj.paymentInfo]
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)

    }
}
async function getAllOrdersOnDate(date) {
    let sql = `select id from orders where delivery_date = ? `
    let parameters = [date];
    try {
        let ordersOnDate = await connection.executeWithParameters(sql, parameters);
        return ordersOnDate

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
module.exports = { addOrder,getAllOrdersOnDate }