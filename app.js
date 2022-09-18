const express = require("express");
const cors = require('cors');
const server = express();
const loginFilter = require("./filters/login-filter");



const productsController = require("./controllers/products-controller");
const usersController = require("./controllers/users-controller");
const ordersController = require("./controllers/orders-controller");
const categoriesController = require("./controllers/categories-controller");
const shoppingCartController = require("./controllers/shoppingCart-controller");

const errorHandler = require("./errors/error-handler");

server.use(cors({ origin: `http://localhost:4200` }))
server.use(loginFilter());
server.use(express.json());
server.use("/products", productsController);
server.use("/users", usersController);
server.use("/categories", categoriesController);
server.use("/shoppingCart", shoppingCartController);
server.use("/orders", ordersController);
server.use(errorHandler);



server.listen(3001, () => console.log("Listening on http://localhost:3001"));

module.exports = server;