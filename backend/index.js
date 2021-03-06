const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

// json 형태로 오는 요청의 본문 해석
app.use(bodyParser.json());

// 테이블 생성
// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields) => {
//     console.log('results', results)
// })


// db 목록 보내주기
app.get('/api/values', function (req, res) {
    db.pool.query('SELECT * FROM lists;',
        (err, results, fields) => {
            if (err)
                return res.status(500).send(err);
            else
                return res.json(results);
        })
})

// 입력값 db 넣기
app.post('/api/value', function (req, res, next) {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fields) => {
            if (err)
                return res.status(500).send(err);
            else
                return res.json({ success: true, value: req.body.value });
        })
})


app.listen(5000, () => {
    console.log("Running on port 5000")
})

