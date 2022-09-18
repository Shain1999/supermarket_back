const connection = require("./dbconfig");
const ErrorType = require('../errors/error-types')

const ServerError = require("../errors/server-error");

async function getAllCategories() {
    let sql = `select * from categories`
    try {
        let categoriesArray = await connection.execute(sql);
        return categoriesArray

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
module.exports = { getAllCategories }