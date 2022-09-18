const shoppingCartDal = require("../dal/shoppingCart-dal");
const ServerError = require("../errors/server-error")
const ErrorType = require("../errors/error-types")
const jwtDecode = require('jwt-decode');


async function getShoppingCartByToken(token) {
    let userId = jwtDecode(token).userId;
    try {
        let shoppingCart = await shoppingCartDal.getShoppingCartByUserId(userId);
        if (shoppingCart == null) {
            return [];
        }
        return shoppingCart;
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function getTotalSumOfCartByToken(token) {
    try {
        let shoppingCart = await getShoppingCartByToken(token);
        let shoppingCartTotalSum = await shoppingCartDal.calcTotalPriceOfCart(shoppingCart[0].id)
        if (!shoppingCartTotalSum.length > 0) {
            throw new ServerError(ErrorType.GENERAL_ERROR, `no items in cart`)

        }
        return shoppingCartTotalSum

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)

    }
}
async function getAllItemsInShoppingCart(token) {
    let userId = jwtDecode(token).userId;

    try {
        let shoppingCart = await getShoppingCartByToken(token);
        let shoppingCartItems = await shoppingCartDal.getAllItemsInShoppingCart(shoppingCart[0].id)
        if (!shoppingCartItems.length > 0) {
            return []
        }
        return shoppingCartItems

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)

    }
}
async function getProductPriceById(productId) {
    try {
        let productPrice = await shoppingCartDal.getProductPriceById(productId);
        return productPrice;
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function addItemToCart(addToCartObj) {
    try {
        let isProductExistInCart = await shoppingCartDal.isProductExistInCart(addToCartObj.cartId, addToCartObj.productId)
        if (isProductExistInCart.length > 0) {
            throw new ServerError(ErrorType.GENERAL_ERROR, `product already exist`)

        }
        let productPrice = await shoppingCartDal.getProductPriceById(addToCartObj.productId);
        addToCartObj.totalPrice = addToCartObj.amount * productPrice[0].price;
        await shoppingCartDal.addItemToCart(addToCartObj);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function updateCartItem(updateItemObj) {
    try {
        let productPrice = await shoppingCartDal.getProductPriceById(updateItemObj.productId);
        updateItemObj.totalPrice = updateItemObj.amount * productPrice[0].price;
        await shoppingCartDal.updateCartItem(updateItemObj);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function deleteCartItem(cartItemId) {
    try {
        await shoppingCartDal.deleteCartItem(cartItemId);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function createNewCartForUserByToken(token) {
    let userId = jwtDecode(token).userId;
    try {
        await shoppingCartDal.createNewCartForUser(userId)

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function cleanShoppingCartAfterOrder(token) {
    let shoppingCartData = await getShoppingCartByToken(token);
    let cartId = shoppingCartData[0].id;
    try {
        await shoppingCartDal.cleanShoppingCartAfterOrder(cartId)
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}

module.exports = { cleanShoppingCartAfterOrder, createNewCartForUserByToken, getTotalSumOfCartByToken, deleteCartItem, updateCartItem, addItemToCart, getShoppingCartByUserId: getShoppingCartByToken, getAllItemsInShoppingCart, getProductPriceById };