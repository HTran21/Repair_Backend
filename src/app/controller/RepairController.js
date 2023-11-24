const pool = require('../../config/db');
const nodemailer = require('nodemailer');
const sendNotificationEmail = require("../../middleware/sendEmail");
class RepairController {
    registerRepair(req, res) {
        try {
            const { ID_User, thietbi, mota, date } = req.body;
            const trangthai = 'N';

            pool.getConnection((err, connection) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Lỗi Server Nội Bộ" });
                }

                // Kiểm tra xem một bản ghi với ID_User và ID_item đã cho đã tồn tại hay chưa
                connection.query('SELECT * FROM repair WHERE ID_User = ? AND ID_item = ? AND TrangThai = ?', [ID_User, thietbi, trangthai], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Lỗi Server Nội Bộ" });
                    }

                    if (rows.length > 0) {
                        // Bản ghi đã tồn tại
                        return res.json({ error: "Đơn đăng ký đã tồn tại" });
                    } else {
                        // Bản ghi không tồn tại, tiếp tục với truy vấn INSERT
                        connection.query('INSERT INTO repair SET ID_User = ?, ID_item = ?, NgayDK = ?, MoTa = ?, TrangThai =?',
                            [ID_User, thietbi, date, mota, trangthai], (err, data) => {
                                if (!err) {
                                    res.json({ message: "Đăng ký sửa chữa thành công" });
                                } else {
                                    console.log(err);
                                    res.json({ error: "Đăng ký thất bại" });
                                }
                            });
                    }
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Lỗi Server Nội Bộ" });
        }
    }


    listRepair(req, res, next) {
        try {
            const ID_User = req.params.id;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT ID_Repair, phong.ID_Phong, day.ID_Day, items.ID_item, MSSV ,nameItem, HoTen, NgayDK, NgayDuyet, MoTa, TrangThai  FROM repair JOIN users ON repair.ID_User = users.ID_User JOIN phong ON users.ID_Phong = phong.ID_Phong JOIN day ON phong.ID_Day = day.ID_Day JOIN items ON repair.ID_item = items.ID_item WHERE repair.ID_User = ?', [ID_User],
                    (err, data) => {
                        if (err) return res.json(err);
                        res.json(data);
                    })
            })

        }
        catch (error) {
            console.log(error);
        }
    }


    listUnapprovied(req, res, next) {
        try {
            const TrangThai = 'N';
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT ID_Repair, phong.ID_Phong, day.ID_Day, items.ID_item, MSSV ,nameItem, HoTen, NgayDK,NgayDuyet, MoTa,TrangThai  FROM repair JOIN users ON repair.ID_User = users.ID_User JOIN phong ON users.ID_Phong = phong.ID_Phong JOIN day ON phong.ID_Day = day.ID_Day JOIN items ON repair.ID_item = items.ID_item WHERE repair.TrangThai = ?', [TrangThai],
                    (err, data) => {
                        if (err) return res.json(err);
                        res.json(data);
                    })
            })

        }
        catch (error) {
            console.log(error);
        }
    }


    listAccept(req, res, next) {
        try {
            const TrangThai = 'Y';
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT ID_Repair, phong.ID_Phong, day.ID_Day, items.ID_item, MSSV ,nameItem, HoTen, NgayDK, NgayDuyet,MoTa,TrangThai  FROM repair JOIN users ON repair.ID_User = users.ID_User JOIN phong ON users.ID_Phong = phong.ID_Phong JOIN day ON phong.ID_Day = day.ID_Day JOIN items ON repair.ID_item = items.ID_item WHERE repair.TrangThai = ?', [TrangThai],
                    (err, data) => {
                        if (err) return res.json(err);
                        res.json(data);
                    })
            })

        }
        catch (error) {
            console.log(error);
        }
    }


    infoRepair(req, res, next) {
        try {
            const ID_Repair = req.params.id;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT ID_Repair, phong.TenPhong, day.TenDay, items.ID_item, MSSV ,nameItem, HoTen, email, phone, NgayDK, MoTa,TrangThai  FROM repair JOIN users ON repair.ID_User = users.ID_User JOIN phong ON users.ID_Phong = phong.ID_Phong JOIN day ON phong.ID_Day = day.ID_Day JOIN items ON repair.ID_item = items.ID_item WHERE repair.ID_Repair = ?', [ID_Repair],
                    (err, data) => {
                        if (err) return res.json(err);
                        res.json(data[0]);
                    })
            })

        }
        catch (error) {
            console.log(error);
        }
    }

    updateRepair(req, res, next) {
        try {
            const ID_Repair = req.params.id;
            const { thietbi, mota } = req.body;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('UPDATE repair SET ID_item = ?, MoTa = ? WHERE ID_Repair = ? ', [thietbi, mota, ID_Repair],
                    (err, data) => {
                        if (!err) {
                            res.json({ message: "Cập nhật thông tin thành công" })
                        }
                        else {
                            console.log(err);
                            res.json({ error: "Cập nhật dữ liệu thất bại" })
                        }
                    })
            })
        }
        catch (error) {
            console.log(error);
        }
    }


    accpetRepair(req, res, next) {
        try {
            const ID_Repair = req.params.id;
            const TrangThai = "Y";
            const { nhanvien, ngayDuyet } = req.body;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('UPDATE repair SET ID_Staff = ?, NgayDuyet = ?, TrangThai = ? WHERE ID_Repair = ? ', [nhanvien, ngayDuyet, TrangThai, ID_Repair],
                    async (err, data) => {
                        if (!err) {
                            // await sendNotificationEmail(ID_Repair);

                            res.json({ message: "Duyệt đơn đăng ký thành công" })
                        }
                        else {
                            console.log(err);
                            res.json({ error: "Duyệt đơn đăng ký thất bại" })
                        }
                    })
            })
        }
        catch (error) {
            console.log(error);
        }
    }


    deleteRepair(req, res) {
        const id = req.body.id;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('DELETE FROM repair WHERE ID_Repair = ?', [id], (err, rows) => {
                if (!err) {
                    res.json({ message: "Đơn đăng ký đã được xóa" })
                }
                else {
                    console.log(err);
                    res.json({ error: "Xóa đơn đăng ký không thành công" })
                }
            })
        })
    }

    infoRepairAccept(req, res, next) {
        try {
            const ID_Repair = req.params.id;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT ID_Repair, phong.TenPhong, day.TenDay, items.ID_item, MSSV ,nameItem, users.hoten AS hotenUser, staffs.hoten AS hotenNV, users.email, users.phone, NgayDK, MoTa,TrangThai  FROM repair JOIN users ON repair.ID_User = users.ID_User JOIN phong ON users.ID_Phong = phong.ID_Phong JOIN day ON phong.ID_Day = day.ID_Day JOIN items ON repair.ID_item = items.ID_item JOIN staffs ON repair.ID_Staff = staffs.ID_Staff WHERE repair.ID_Repair = ?', [ID_Repair],
                    (err, data) => {
                        if (err) return res.json(err);
                        res.json(data[0]);
                    })
            })

        }
        catch (error) {
            console.log(error);
        }
    }

    reloadRepair(req, res, next) {
        try {
            const ID_Repair = req.params.id;
            const TrangThai = "N";
            const ngayDK = req.body.dateReload;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('UPDATE repair SET NgayDK = ?, TrangThai = ? WHERE ID_Repair = ? ', [ngayDK, TrangThai, ID_Repair],
                    async (err, data) => {
                        if (!err) {

                            res.json({ message: "Reload đơn đăng ký thành công" })
                        }
                        else {
                            console.log(err);
                            res.json({ error: "Reload đơn đăng ký thất bại" })
                        }
                    })
            })
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = new RepairController;