const productRouter = require("./product");
const userRouter = require("./user");
const authentication = require("./authentication");
const repairRouter = require("./repair");

function route(app) {
    app.use("/user", userRouter);
    app.use("/authentication", authentication);
    app.use("/product", productRouter);
    app.use("/repair", repairRouter);
}

module.exports = route;