const productRouter = require("./product");
const userRouter = require("./user");
const authentication = require("./authentication");
const repairRouter = require("./repair");
const contactRouter = require("./contact")

function route(app) {
    app.use("/user", userRouter);
    app.use("/authentication", authentication);
    app.use("/product", productRouter);
    app.use("/repair", repairRouter);
    app.use("/contact", contactRouter);
}

module.exports = route;