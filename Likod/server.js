const express = require('express')
const mysql = require('mysql')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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
    const sql = "INSERT INTO user (`user_ID`,`email`,`password`) Values (?) ";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) =>{
        if(err) return res.json({Error:"Error for hasshing password"});
    
        const values = [
            req.body.user_ID,
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
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                return res.json({Error:"Token is not okay"})
            } else{
                req.user_ID = decoded.user_ID
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) =>{
    return res.json({Status: "Success", name: req.user_ID});
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
                    const user_ID = data[0].user_ID;
                    const token = jwt.sign({user_ID}, process.env.SECRET_KEY, {expiresIn: '1d'})
                    console.log(token)
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
app.post('/createDream', verifyUser, (req,res) => {
    const userId = req.user_ID 
    const sql = "INSERT INTO dreams (`DreamName`,`DreamDate`,`DreamDescription`, `user_ID`) VALUES (?)"
    const values = [
        req.body.DreamName,
        req.body.DreamDate,
        req.body.DreamDescription,
        userId
    ]
    
    db.query(sql, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("created")
    })
})

//Get Dreams
app.get('/getDreams',(req, res) => {
    const sql = "SELECT * FROM dreams WHERE user_ID = ?"
    db.query(sql, values)
})

app.listen(8001, ()=> {
    console.log("Server is Open")
})