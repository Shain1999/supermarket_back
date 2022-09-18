const categoriesDal = require("../dal/categories-dal");
const ServerError = require("../errors/server-error")
const ErrorType = require("../errors/error-types")

async function getAllCategories() {
    try {
        let categoriesArray = await categoriesDal.getAllCategories();
        return categoriesArray;
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
module.exports = { getAllCategories };