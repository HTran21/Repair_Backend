const pool = require('../../config/db');
const multer = require('multer');
const storage = require('../../middleware/upload_middleware');

class UserConTroller {

    // [GET]
    listUser(req, res, next) {
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT * FROM users', (err, data) => {
                    if (err) return res.json(err);
                    res.json(data)
                });

            });
        }
        catch (error) {
            console.log(error);
        }
    }
    // [GET]
    listStaff(req, res, next) {
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT * FROM staffs', (err, data) => {
                    if (err) return res.json(err);
                    res.json(data)
                });

            });
        }
        catch (error) {
            console.log(error);
        }
    }

    //[GET] user/:id
    infoUser(req, res, next) {
        const id_user = req.params.id;
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT * FROM users JOIN phong ON users.ID_Phong = phong.ID_Phong JOIN day ON phong.ID_Day = day.ID_Day WHERE users.ID_User = ?', [id_user], (err, data) => {
                    if (err) return res.json(err);
                    res.json(data[0]);
                })
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    //[GET] /day
    day(req, res) {
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT * FROM day', (err, data) => {
                    if (err) return res.json(err);
                    return res.json(data);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    //[GET] /day/:id
    phong(req, res) {
        const ID_DAY = req.params.id
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT * FROM phong WHERE ID_DAY = ?', [ID_DAY], (err, data) => {
                    if (err) return res.json(err);
                    return res.json(data);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    // [PUT] update/:id
    updateInfo(req, res, next) {
        const upload = multer({ storage: storage }).single("avatar");

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.send(err);
            }
            else if (err) {
                res.send(err);
            }
            else {
                if (req.file) {
                    const url = req.file.originalname;
                    const { MSSV, hoten, email, phone, phong } = req.body;
                    const id = req.params.id;

                    pool.getConnection((err, connection) => {
                        connection.query('UPDATE users SET MSSV = ?, hoten = ?, email = ? , phone = ?, avatar = ?, ID_Phong = ? WHERE ID_User = ?',
                            [MSSV, hoten, email, phone, url, phong, id], (err, data) => {
                                if (!err) {
                                    res.json({ message: "Cập nhật thông tin thành công" })
                                }
                                else {
                                    console.log(err);
                                    res.json({ error: "Cập nhật thông tin thất bại" })
                                }
                            })
                    })
                }
                else {
                    const { MSSV, hoten, email, phone, phong } = req.body;
                    const id = req.params.id;

                    pool.getConnection((err, connection) => {
                        connection.query('UPDATE users SET MSSV = ?, hoten = ?, email = ? , phone = ?, ID_Phong = ? WHERE ID_User = ?',
                            [MSSV, hoten, email, phone, phong, id], (err, data) => {
                                if (!err) {
                                    res.json({ message: "Cập nhật thông tin thành công" })
                                }
                                else {
                                    console.log(err);
                                    res.json({ error: "Cập nhật thông tin thất bại" })
                                }
                            })
                    })
                }



            }
        })
    }

    deleteStaff(req, res) {

        try {
            const ID_Staff = req.params.id;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('DELETE FROM staffs WHERE ID_Staff = ?', [ID_Staff], (err, rows) => {
                    if (!err) {
                        res.json({ message: "Nhân viên đã được xóa" })
                    }
                    else {
                        console.log(err);
                        res.json({ error: "Xóa nhân viên không thành công" })
                    }
                })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    }

    deleteUser(req, res) {

        try {
            const ID_User = req.params.id;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('DELETE FROM users WHERE ID_User = ?', [ID_User], (err, rows) => {
                    if (!err) {
                        res.json({ message: "Sinh viên đã được xóa" })
                    }
                    else {
                        console.log(err);
                        res.json({ error: "Xóa sinh viên không thành công" })
                    }
                })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    }

    dashBoard(req, res) {
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;

                // Số lượng người dùng
                connection.query('SELECT COUNT(*) AS totalUsers FROM users', (err, usersResult) => {
                    if (err) throw err;

                    // Số lượng nhân viên
                    connection.query('SELECT COUNT(*) AS totalStaffs FROM staffs', (err, staffsResult) => {
                        if (err) throw err;

                        // Số lượng đơn sửa chữa với TrangThai = "N"
                        connection.query('SELECT COUNT(*) AS totalRepairs FROM repair WHERE TrangThai = "N"', (err, repairsResult) => {
                            if (err) throw err;

                            res.json({
                                totalUsers: usersResult[0].totalUsers,
                                totalStaffs: staffsResult[0].totalStaffs,
                                totalRepairs: repairsResult[0].totalRepairs,
                            });
                        });
                    });
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new UserConTroller;
