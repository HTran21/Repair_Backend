const pool = require('../../config/db');

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

}

module.exports = new UserConTroller;
