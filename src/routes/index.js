const registerRouter = require('./register');
const loginRouter = require('./login');

function route(app) {
    app.use("/register", registerRouter);
    app.use("/login", loginRouter);
}

module.exports = route;