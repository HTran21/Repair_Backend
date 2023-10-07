const registerRouter = require('./register');
const loginRouter = require('./login');
const productRouter = require("./product");

function route(app) {
    app.use("/register", registerRouter);
    app.use("/login", loginRouter);
    app.use("/product", productRouter);
}

module.exports = route;