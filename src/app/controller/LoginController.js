const pool = require('../../config/db');

class LoginController {
    // [POST] /
    login(req, res) {
        const { MSSV, password } = req.body;

        const values = req.body;

        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query('SELECT MSSV FROM users WHERE MSSV = ? AND password = ?', [MSSV, password], (err, rows, fields) => {
                if (!err) {
                    if (rows.length) {
                        res.send({ message: "Đăng nhập thành công" });
                    }
                    else {
                        res.send({ error: "Đăng nhập thất bại" });
                    }
                } else {
                    console.log(err);
                }
            })
        })

    }
}

module.exports = new LoginController;