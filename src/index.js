const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const port = 3000;

const route = require("./routes");

app.use(cors());

// static public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "upload")));

// parse application/json
// app.use(bodyParser.json());
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// route app
route(app);

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, "src/upload");
//     },
//     filename: function (req, file, cb) {
//         return cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage });

// app.post('/product/add', upload.single('file'), (req, res) => {
//     console.log(req.body.nameItem)
//     console.log(req.file.originalname);
//     // console.log(req.file)
// })

// connect database
const pool = require('./config/db');

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as ID ' + connection.threadId);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})