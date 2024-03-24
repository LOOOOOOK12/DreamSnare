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
    origin: ["https://dream-snare-api.vercel.app"],
    methods: ["POST", "GET","PUT", "DELETE"],
    credentials: true
}));
    //https://dream-snare-api.vercel.app - domain
    //"http://localhost:5173" - local host  
app.get("/",(req,res) =>{
    res.json("Hello");
})

app.use(express.json())
app.use(cookieParser())

const db = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'website'
})

// Create Account
app.post('/signup', (req, res) => {
    // Check if username or email already exists
    const checkUserSql = "SELECT * FROM user WHERE username = ? OR email = ?";
    const checkUserValues = [req.body.username, req.body.email];

    db.query(checkUserSql, checkUserValues, (err, result) => {
        if (err) return res.json({ error: "Database error" });

        // If result is not empty, username or email already exists
        if (result.length > 0) {
            const existingUser = result[0];
            if (existingUser.username === req.body.username) {
                return res.json({ error: "Username already exists" });
            } else {
                return res.json({ error: "Email already exists" });
            }
        }

        // If username and email are unique, proceed with user creation
        const insertUserSql = "INSERT INTO user (`user_ID`,`username`,`email`,`password`) VALUES (?) ";
        bcrypt.hash(req.body.password.toString(), salt, (hashErr, hash) => {
            if (hashErr) return res.json({ error: "Error hashing password" });

            const values = [
                req.body.user_ID,
                req.body.username,
                req.body.email,
                hash
            ];

            db.query(insertUserSql, [values], (insertErr, insertResult) => {
                if (insertErr) return res.json({ error: "Inserting data error in server" });
                return res.json({ status: "Success" });
            });
        });
    });
});

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
                req.username = decoded.username
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) =>{
    return res.json({Status: "Success", user_ID: req.user_ID , username: req.username});
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
                    const username = data[0].username;
                    const token = jwt.sign({user_ID,username}, process.env.SECRET_KEY, {expiresIn: '1d'})
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
app.get('/getDreams', verifyUser, (req, res) => {
    const user_ID = req.user_ID; 
    const sql = "SELECT * FROM dreams WHERE user_ID = ?";
    db.query(sql, [user_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ Error: "Internal Server Error" });
        }
        return res.json(results);
    });
});

// Edit Dreams
app.put('/editDream/:dream_ID', verifyUser, (req, res) => {
    const dream_ID = req.params.dream_ID;
    const { DreamName, DreamDate, DreamDescription } = req.body;

    const sql = "UPDATE dreams SET DreamName=?, DreamDate=?, DreamDescription=? WHERE dream_ID=?";
    const values = [DreamName, DreamDate, DreamDescription, dream_ID];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Error: "Internal Server Error" });
        }
        console.log('Dream Updated:', results);
        return res.json({ Status: "Success" });
    });
});


// Delete Dreams
app.delete('/deleteDream/:dream_ID', (req, res) => {
    const sql = "DELETE FROM dreams where dream_ID=?";
    const dream_ID = req.params.dream_ID

    db.query(sql, [dream_ID], (err, results) => {
        if (err) { 
            return res.status(500).json({ Error: "Internal Server Error" });
        }
        console.log(dream_ID)
        return res.json("deleted");
    });
});

// app.listen(8001, ()=> {
//     console.log("Server is Open")
// })