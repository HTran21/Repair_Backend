const multer = require('multer');
const storage = require('../../middleware/upload_middleware');
const pool = require('../../config/db');

class ProductController {

    showProduct(req, res) {

        const search = req.query.search;
        if (search) {
            pool.getConnection((err, connection) => {
                if (err) throw err

                connection.query('SELECT * FROM items WHERE nameItem LIKE ?', [`%${search}%`], (err, data) => {
                    if (err) return res.json(err);
                    return res.json(data);
                })
            })
        }
        else {
            pool.getConnection((err, connection) => {
                if (err) throw err

                connection.query('SELECT * FROM items', (err, data) => {
                    if (err) return res.json(err);
                    return res.json(data);
                })
            })
        }
    }



    addProduct(req, res) {

        const upload = multer({ storage: storage }).single("file");

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.send(err);
            }
            else if (err) {
                res.send(err);
            }
            else {
                const url = req.file.originalname;
                const statusItem = 'active';
                const { nameItem, sizeItem, colorItem, chatlieu, desItem } = req.body;
                pool.getConnection((err, connection) => {
                    if (err) throw err

                    connection.query('SELECT * FROM items WHERE nameItem = ? ', [nameItem], (err, rows) => {
                        if (!err) {
                            if (rows.length) {
                                res.json({ error: "Sản phẩm đã tồn tại!" });
                            }
                            else {
                                connection.query('INSERT INTO items SET nameItem = ? , imageItem = ?, sizeItem = ?, colorItem = ?, chatlieu = ?, desItem = ?, statusItem = ?',
                                    [nameItem, url, sizeItem, colorItem, chatlieu, desItem, statusItem], (err, rows) => {
                                        if (!err) {
                                            res.send({ message: 'Thêm sản phẩm thành công' });

                                        }
                                        else {
                                            console.log(err);
                                        }
                                    })
                            }
                        }
                    })

                })


            }
        })
    }

    showProductID(req, res) {
        const id = req.params.id;
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('SELECT * FROM items WHERE ID_item = ? ', [id], (err, data) => {
                if (err) return res.json(err)
                return res.json(data)
            })
        })
    }

    updateProduct(req, res) {
        const upload = multer({ storage: storage }).single("file");

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
                    const { nameItem, sizeItem, colorItem, chatlieu, desItem } = req.body;
                    const id = req.params.id;

                    pool.getConnection((err, connection) => {
                        connection.query('UPDATE items SET nameItem  = ?, imageItem = ?, sizeItem = ?, colorItem = ?, chatlieu = ?, desItem = ? WHERE ID_item = ?',
                            [nameItem, url, sizeItem, colorItem, chatlieu, desItem, id], (err, data) => {
                                if (!err) {
                                    res.json({ message: "Cập nhật thông tin thiết bị thành công" })
                                }
                                else {
                                    console.log(err);
                                    res.json({ error: "Cập nhật dữ liệu thất bại" })
                                }
                            })
                    })
                }
                else {
                    const { nameItem, sizeItem, colorItem, chatlieu, desItem } = req.body;
                    const id = req.params.id;

                    pool.getConnection((err, connection) => {
                        connection.query('UPDATE items SET nameItem  = ?, sizeItem = ?, colorItem = ?, chatlieu = ?, desItem = ? WHERE ID_item = ?',
                            [nameItem, sizeItem, colorItem, chatlieu, desItem, id], (err, data) => {
                                if (!err) {
                                    res.json({ message: "Cập nhật thông tin thiết bị thành công" })
                                }
                                else {
                                    console.log(err);
                                    res.json({ error: "Cập nhật dữ liệu thất bại" })
                                }
                            })
                    })
                }


            }
        })
    }

    deleteProduct(req, res) {
        const id = req.body.id;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('DELETE FROM items WHERE ID_item = ?', [id], (err, rows) => {
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

module.exports = new ProductController;