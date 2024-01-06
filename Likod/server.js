const express = require('express')
const mysql = require('mysql')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const salt = 10;

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

const db = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'website'
})

//Create Account
app.post('/signup',(req,res) => {
    const sql = "INSERT INTO user (`username`,`email`,`password`) Values (?) ";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) =>{
        if(err) return res.json({Error:"Error for hasshing password"});
    
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err,result) =>{
            if(err) return res.json({Error:"Inserting data Error in Server"});
            return res.json({Status:"Success"});
        })
    })
})

//Middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.json({Error: "You are not authenticated"})
    } 
    else{
        jwt.verify(token, "jwts-secret-key", (err, decoded) => {
            if(err){
                return res.json({Error:"Token is not okay"})
            } else{
                req.username = decoded.username
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) =>{
    return res.json({Status: "Success", name: req.username});
});

//LOGIN
app.post('/', (req, res) => {
    const sql ='SELECT * FROM user WHERE email = ?'
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error: "Login error in server"})
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "password compare error"})
                if(response){
                    const username= data[0].username;
                    const token = jwt.sign({username}, "jwts-secret-key", {expiresIn: '1d'})
                    res.cookie('token', token)
                    return res.json({Status: "Success"})
                } else{
                    return res.json({Error: "Password not match"})
                }
            })
        } else{
            return res.json({Error:"no email existed"})
        }
    })
})

//LOGOUT
app.get('/logout',(req,res) => {
    res.clearCookie('token')
    return res.json({Status:"Success"})
})

//Create Dream
app.post('/createDream', (req,res) =>{
    const sql = "INSERT INTO dreams (`DreamName`,`DreamDate`,`DreamDescription`) VALUES (?)"
    const values = [
        req.body.DreamName,
        req.body.DreamDate,
        req.body.DreamDescription,
    ]
    db.query(sql, [values], (err, data) =>{
        if(err) return res.json(err)
        return res.json("created")
    })
})

app.listen(8001, ()=> {
    console.log("Server is Open")
})