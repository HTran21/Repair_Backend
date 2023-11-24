const pool = require('../../config/db');
class ContactController {
    listRepair(req, res, next) {
        try {
            const ID_User = req.params.id;
            const TrangThai = 'Y';
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('SELECT ID_Repair ,nameItem, HoTen, NgayDuyet  FROM repair JOIN staffs ON repair.ID_Staff = staffs.ID_staff JOIN items ON repair.ID_item = items.ID_item WHERE repair.TrangThai = ? AND repair.ID_User = ?', [TrangThai, ID_User],
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

    addContact(req, res, next) {
        try {
            const ID_User = req.params.id;
            const ID_Repair = req.body.IdRepair;
            const comment = req.body.contact;
            const date = req.body.date;
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query('INSERT INTO contacts SET ID_User = ?, ID_Repair = ?, comment = ?, ngayContact = ? ', [ID_User, ID_Repair, comment, date],
                    (err, data) => {
                        if (!err) {
                            res.send({ message: 'Thêm phản hồi thành công' });

                        }
                        else {
                            console.log(err);
                        }
                    })
            })
        } catch (error) {
            console.log(error);
        }
    }

    listContact(req, res, next) {
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query("SELECT ID_Contact, contacts.ID_Repair,items.nameItem, users.MSSV, staffs.hoten, contacts.ngayContact, repair.TrangThai,contacts.comment FROM contacts JOIN users ON contacts.ID_User = users.ID_User JOIN repair ON contacts.ID_Repair = repair.ID_Repair JOIN items ON repair.ID_Item = items.ID_Item JOIN staffs ON repair.ID_Staff = staffs.ID_Staff", (err, data) => {
                    if (!err) {
                        res.send(data);
                    }
                    else {
                        console.log(err);
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }

    }

    listContactUser(req, res, next) {
        try {
            const ID_User = req.params.id
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query("SELECT ID_Contact, contacts.ID_Repair,items.nameItem, users.MSSV, staffs.hoten, contacts.ngayContact, repair.TrangThai,contacts.comment FROM contacts JOIN users ON contacts.ID_User = users.ID_User JOIN repair ON contacts.ID_Repair = repair.ID_Repair JOIN items ON repair.ID_Item = items.ID_Item JOIN staffs ON repair.ID_Staff = staffs.ID_Staff WHERE contacts.ID_User = ?", [ID_User], (err, data) => {
                    if (!err) {
                        res.send(data);
                    }
                    else {
                        console.log(err);
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }

    }

    deleteContact(req, res) {
        const id = req.params.id;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('DELETE FROM contacts WHERE ID_Contact = ?', [id], (err, rows) => {
                if (!err) {
                    res.json({ message: "Phản hồi đã được xóa" })
                }
                else {
                    console.log(err);
                    res.json({ error: "Xóa phản hồi không thành công" })
                }
            })
        })
    }
}

module.exports = new ContactController;