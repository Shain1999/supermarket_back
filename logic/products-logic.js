const productsDal = require("../dal/products-dal");
const ServerError = require("../errors/server-error")
const ErrorType = require("../errors/error-types")
const jwtDecode = require('jwt-decode');


async function getAllProducts() {
    try {
        let productsArray = await productsDal.getAllProducts();
        return productsArray;
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function addProduct(productObj, token) {
    let userType = jwtDecode(token).userType
    if (userType != 'admin') {
        throw new ServerError(ErrorType.UNAUTHORIZED_USER)
    }
    try {
        let isProductExistByName=await productsDal.isProductExistByName(productObj.name);
        if (!isProductExistByName) {
            await productsDal.addProduct(productObj);
        }
        throw new ServerError(ErrorType.GENERAL_ERROR, 'product already exist')

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function updateProduct(productObj, token) {
    let userType = jwtDecode(token).userType
    if (userType != 'admin') {
        throw new ServerError(ErrorType.UNAUTHORIZED_USER)
    }
    try {
        await productsDal.updateProduct(productObj);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
module.exports = { getAllProducts, addProduct, updateProduct };