const connection = require("./dbconfig");
const ServerError = require("../errors/server-error")
const ErrorType = require("../errors/error-types")

async function getShoppingCartByUserId(userId) {
    let sql = `select sc.id,sc.user_id as userId ,sc.date from shopping_cart sc where sc.user_id=?`
    let parameters = [userId]
    try {
        let shoppingCart = await connection.executeWithParameters(sql, parameters);
        return shoppingCart

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function getAllItemsInShoppingCart(shoppingCartId) {
    let sql = `select ci.id as cartItemId,ci.cart_id as cartId,p.name as productName,p.id as productId,ci.amount ,ci.total_price as totalPrice ,p.img 
    from cart_item ci join products p on p.id=ci.product_id where ci.cart_id=? `
    let parameters = [shoppingCartId];
    try {
        let shoppingCartItems = await connection.executeWithParameters(sql, parameters);
        return shoppingCartItems

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }

}
async function addItemToCart(addToCartObj) {
    let sql = `insert into cart_item(cart_id,product_id,amount,total_price)` + `values(?,?,?,?)`
    let parameters = [addToCartObj.cartId, addToCartObj.productId, addToCartObj.amount, addToCartObj.totalPrice]
    try {
        await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function updateCartItem(updateItemObj) {
    let sql = `update cart_item set amount =?,total_price=? where id=?`
    let parameters = [updateItemObj.amount, updateItemObj.totalPrice, updateItemObj.cartItemId];
    try {
        await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function calcTotalPriceOfCart(cartId) {
    let sql = `SELECT Sum(total_price) as totalCartPrice FROM supermarket.cart_item where cart_id =?`
    let parameters = [cartId]
    try {
        let totalSum = await connection.executeWithParameters(sql, parameters);
        return totalSum;

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function deleteCartItem(cartItemId) {

    let sql = `delete from cart_item where id=?`
    let parameters = [cartItemId]
    try {
        await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function getProductPriceById(productId) {
    let sql = `select p.price from products p where p.id = ?`
    let parameters = [productId]
    try {
        let productPrice = await connection.executeWithParameters(sql, parameters);
        return productPrice

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function isProductExistInCart(cartId, productId) {
    let sql = `select * from cart_item where cart_id =? and product_id=? `
    let parameters = [cartId, productId];
    try {
        let product = await connection.executeWithParameters(sql, parameters);
        return product;

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function createNewCartForUser(userId) {
    let sql = `insert into shopping_cart(user_id,date)` + `values(?,?)`
    let dateNow = new Date()
    let parameters = [userId, dateNow.toISOString()
    ];
    try {
        await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function cleanShoppingCartAfterOrder(cartId) {
    let sql = `delete from cart_item where cart_id=?`
    let paramaters = [cartId]
    try {
        await connection.executeWithParameters(sql, paramaters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
module.exports = {cleanShoppingCartAfterOrder, createNewCartForUser, calcTotalPriceOfCart, isProductExistInCart, getShoppingCartByUserId, getAllItemsInShoppingCart, addItemToCart, getProductPriceById, updateCartItem, deleteCartItem };