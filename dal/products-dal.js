const connection = require("./dbconfig");
const ServerError = require("../errors/server-error")
const ErrorType = require("../errors/error-types")

async function getAllProducts() {
    let sql = `select p.id,p.name,c.name as category,p.price,p.img from products p join categories c on c.id = p.category_id `
    try {
        let productsArray = await connection.execute(sql);
        return productsArray

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function addProduct(productObj) {
    let sql = `insert into products(name,category_id,price,img)` + `values(?,?,?,?)`
    let parameters = [productObj.name, productObj.categoryId, productObj.price, productObj.img];
    try {
        await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function updateProduct(productObj) {
    let sql = `update products set name=?,category_id=?,price=?,img=? where id=?`
    let parameters = [productObj.name, productObj.categoryId, productObj.price, productObj.img, productObj.id]
    try {
        await connection.executeWithParameters(sql, parameters);

    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error.message)
    }
}
async function isProductExistByName(name) {
    let sql = `select id from products where name=?`
    let parameters = [name]
    
    try {
        let products = await connection.executeWithParameters(sql, parameters);
        console.log(products);
        if (products && products.length!= 0) {
            return true;
        }
        return false;
    } catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e)
    }
}
module.exports = { isProductExistByName,getAllProducts, addProduct, updateProduct };