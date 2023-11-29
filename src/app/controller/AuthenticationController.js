const pool = require('../../config/db');
const multer = require('multer');
const storage = require('../../middleware/upload_middleware');
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { query } = require('express');

dotenv.config('.env');

const secretKey = process.env.JWT_SECRET;

class AuthenticationController {
    // [POST}] /
    addUser(req, res, next) {
        const upload = multer({ storage: storage }).single("avatar");

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.send(err);
            }
            else if (err) {
                res.send(err);
            }
            else {

                const url = req.file.originalname;
                const { MSSV, username, password, email, phone, phong } = req.body;

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

                                let hashPassword = bcrypt.hashSync(password, salt);

                                connection.query('INSERT INTO users SET MSSV = ?, hoten = ?, password = ?, email = ?, phone = ?, avatar = ?,role = ?, status = ?, ID_Phong = ?',
                                    [MSSV, username, hashPassword, email, phone, url, role, status, phong], (err, rows) => {
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
        })
    }

    // [POST}] /Admin add staff
    addStaff(req, res, next) {
        const upload = multer({ storage: storage }).single("avatar");

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.send(err);
            }
            else if (err) {
                res.send(err);
            }
            else {

                const url = req.file.originalname;
                const { MaNV, username, password, chucvu, email, phone, role } = req.body;
                var status = 'active';

                const values = req.body;


                pool.getConnection((err, connection) => {
                    if (err) throw err;


                    connection.query('SELECT MaNV FROM staffs WHERE MaNV = ? ', [MaNV], (err, rows, fields) => {
                        // connection.release();

                        if (!err) {

                            if (rows.length) {
                                // res.send(rows[0].MSSV);
                                res.send({ values, error: "Tài khoản đã tồn tại" });

                            }
                            else {

                                let hashPassword = bcrypt.hashSync(password, salt);

                                connection.query('INSERT INTO staffs SET MaNV = ?, hoten = ?, password = ?, chucvu = ?,email = ?, phone = ?, avatar = ?,role = ?, status = ?',
                                    [MaNV, username, hashPassword, chucvu, email, phone, url, role, status], (err, rows) => {
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
        })
    }

    // [POST]
    // login(req, res, next) {
    //     try {
    //         const { MSSV, password } = req.body;

    //         const values = req.body;
    //         pool.getConnection((err, connection) => {
    //             if (err) throw err;

    //             connection.query('SELECT * FROM users WHERE MSSV = ?', [MSSV], async (err, rows, fields) => {
    //                 if (!err) {
    //                     if (rows.length) {
    //                         // res.send({ message: "Đăng nhập thành công", values: rows[0].role });
    //                         // console.log(rows[0].MSSV)
    //                         // return res.json(rows[0])
    //                         // console.log(rows[0].password)
    //                         const checkPassword = await bcrypt.compare(password, rows[0].password);
    //                         if (!checkPassword) {
    //                             return res.send({ error: "Sai mật khẩu" });

    //                         }
    //                         else {
    //                             let tokenData = {
    //                                 ID_User: rows[0].ID_User,
    //                                 hoten: rows[0].hoten,
    //                                 email: rows[0].email,
    //                                 role: rows[0].role,
    //                             };
    //                             // const token = jwt.sign(tokenData, secretKey)
    //                             // return res.send({ message: "Đăng nhập thành công", token });
    //                             return res.send({ message: "Đăng nhập thành công", values: rows[0] });
    //                         }

    //                     }
    //                     else {
    //                         res.send({ error: "Đăng nhập thất bại" });
    //                     }
    //                 } else {
    //                     console.log(err);
    //                 }
    //             })
    //         })
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    async login(req, res, next) {
        try {
            const { MSSV, password } = req.body;
            let userData = null;

            pool.getConnection((err, connection) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Lỗi server" });
                }

                connection.query('SELECT * FROM users WHERE MSSV = ?', [MSSV], async (err, userRows) => {
                    if (err) {
                        console.log(err);
                        connection.release();
                        return res.status(500).json({ error: "Lỗi truy vấn SQL" });
                    }

                    if (userRows.length > 0) {
                        userData = userRows[0];
                        connection.release();
                        const checkPassword = await bcrypt.compare(password, userRows[0].password);
                        if (!checkPassword) {
                            return res.send({ error: "Sai mật khẩu" });

                        }
                        return res.status(200).json({ message: "Đăng nhập thành công", data: userData });
                    } else {
                        connection.query('SELECT * FROM staffs WHERE MaNV = ?', [MSSV], async (err, staffRows) => {
                            if (err) {
                                console.log(err);
                                connection.release();
                                return res.status(500).json({ error: "Lỗi truy vấn SQL" });
                            }

                            if (staffRows.length > 0) {
                                userData = staffRows[0];
                                connection.release();
                                const checkPassword = await bcrypt.compare(password, staffRows[0].password);
                                if (!checkPassword) {
                                    return res.send({ error: "Sai mật khẩu" });

                                }
                                return res.status(200).json({ message: "Đăng nhập thành công", data: userData });
                            } else {
                                // connection.release();
                                return res.json({ error: "Tài khoản không tồn tại" });
                            }
                        });
                    }
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Lỗi server" });
        }
    }




}

module.exports = new AuthenticationController;
