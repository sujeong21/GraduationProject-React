const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;
//4000이라는 포트번호를 서버에 할당
const db = require('./config/db');


app.get('/api/products', (req, res) => {
    db.query("SELECT * FROM mall_test", (err, data) => {
        if(!err) res.send({ products : data });
        else res.send(err);
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})