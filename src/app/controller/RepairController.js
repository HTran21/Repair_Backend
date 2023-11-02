const pool = require('../../config/db');

class RepairController {
    registerRepair(req, res) {
        try {
            const { ID_User, thietbi, mota, date } = req.body;
            const trangthai = 'N';
            pool.getConnection((err, connection) => {
                connection.query('INSERT INTO repair SET ID_User = ?, ID_item = ?, NgayDK = ?, MoTa = ?, TrangThai =?',
                    [ID_User, thietbi, date, mota, trangthai], (err, data) => {
                        if (!err) {
                            res.json({ message: "Đăng ký sửa chữa thành công" })
                        }
                        else {
                            console.log(err);
                            res.json({ error: "Đăng ký thất bại" })
                        }
                    })
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    listRepair(req, res, next) {
        try {
            const ID_User = req.params.id;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT ID_Repair, phong.ID_Phong, day.ID_Day, items.ID_item, MSSV ,nameItem, HoTen, NgayDK, MoTa,TrangThai  FROM repair JOIN users ON repair.ID_User = users.ID_User JOIN phong ON users.ID_Phong = phong.ID_Phong JOIN day ON phong.ID_Day = day.ID_Day JOIN items ON repair.ID_item = items.ID_item WHERE repair.ID_User = ?', [ID_User],
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
                connection.query('SELECT ID_Repair, phong.ID_Phong, day.ID_Day, items.ID_item, MSSV ,nameItem, HoTen, NgayDK, MoTa,TrangThai  FROM repair JOIN users ON repair.ID_User = users.ID_User JOIN phong ON users.ID_Phong = phong.ID_Phong JOIN day ON phong.ID_Day = day.ID_Day JOIN items ON repair.ID_item = items.ID_item WHERE repair.TrangThai = ?', [TrangThai],
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

    deleteRepair(req, res) {
        const id = req.body.id;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('DELETE FROM repair WHERE ID_Repair = ?', [id], (err, rows) => {
                if (!err) {
                    res.json({ message: "Thiết bị đã được xóa" })
                }
                else {
                    console.log(err);
                    res.json({ error: "Xóa thiết bị không thành công" })
                }
            })
        })
    }

}

module.exports = new RepairController;