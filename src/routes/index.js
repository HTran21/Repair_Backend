
const productRouter = require("./product");
const userRouter = require("./user");
const authentication = require("./authentication");

function route(app) {
    app.use("/user", userRouter);
    app.use("/authentication", authentication);
    app.use("/product", productRouter);
}

module.exports = route;