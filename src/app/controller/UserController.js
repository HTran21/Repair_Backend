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

}

module.exports = new UserConTroller;
