const pool = require('../../config/db');

class AuthenticationController {
    // [POST}] /
    addUser(req, res, next) {
        try {
            const { MSSV, username, password, email, phone } = req.body;

            var role = 'SV';
            var status = 'active';

            const values = req.body;

            pool.getConnection((err, connection) => {
                if (err) throw err;


                connection.query('SELECT MSSV FROM users WHERE MSSV = ? ', [MSSV], (err, rows, fields) => {
                    // connection.release();

                    if (!err) {

                        if (rows.length) {
                            // res.send(rows[0].MSSV);
                            res.send({ values, error: "Tài khoản đã tồn tại" });

                        }
                        else {

                            // res.send({ message: "Tạo tài khoản thành công" })
                            connection.query('INSERT INTO users SET MSSV = ?, hoten = ?, password = ?, email = ?, phone = ?, role = ?, status = ?',
                                [MSSV, username, password, email, phone, role, status], (err, rows) => {
                                    if (!err) {
                                        res.json({ message: "Tạo tài khoản thành công" });

                                    }
                                    else {
                                        console.log(err);
                                    }
                                });
                        }
                    }
                    else {
                        console.log(err);
                    }
                })
            });
        }
        catch (error) {
            console.log(error);
        }

    }
    // [POST]
    login(req, res, next) {
        try {
            const { MSSV, password } = req.body;

            const values = req.body;

            pool.getConnection((err, connection) => {
                if (err) throw err;

                connection.query('SELECT * FROM users WHERE MSSV = ? AND password = ?', [MSSV, password], (err, rows, fields) => {
                    if (!err) {
                        if (rows.length) {
                            res.send({ message: "Đăng nhập thành công", values: rows[0].role });
                            // console.log(rows[0].MSSV)
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
        catch (error) {
            console.log(error);
        }

    }

}

module.exports = new AuthenticationController;
