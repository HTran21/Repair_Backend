const pool = require('../../config/db');

class RegisterController {
    // [POST}] /
    addUser(req, res) {
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
                        // connection.query('INSERT INTO users SET MSSV = ?, hoten = ?, password = ?, email = ?, phone = ?, role = ?, status = ?',
                        //     [MSSV, username, password, email, phone, role, status], (err, rows) => {
                        //         if (!err) {
                        //             res.json(req.body);
                        //         }
                        //         else {
                        //             console.log(err);
                        //         }
                        //     });
                    }

                    // if (rows[0].MSSV) {
                    //     res.send("Da ton tai");
                    // }
                    // else {
                    //     res.send("Chua ton tai");
                    // }
                }
                else {
                    console.log(err);
                }
                // if (rows != null) {
                //     res.send("Chua ton tai");
                // }
                // else {
                //     res.send("Da ton tai");
                // }
            })



        });

    }
}

module.exports = new RegisterController;
