const express = require('express')
const mysql = require('mysql')
const cors = require("cors")

const app = express()
app.use(cors());

app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'website'
})

app.post('/signup',(req,res) => {
    const sql = "INSERT INTO user (`username`,`email`,`password`) Values (?) "
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
    ]
    db.query(sql, [values], (err,data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })

})

app.listen(8001, ()=> {
    console.log("Server is Open")
})