const express = require("express");
const PORT = 9006;
const path = require("path");

const passport = require('passport');
const session = require('express-session');

const db = require('./config/mongoose');
const jwt = require('./config/passport-jwt-stratergy');

const app = express();

app.use(
    session({
        name: "jwtPractical",
        secret: "jwtPractical",
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
    })
)

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());


app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use('/admin', require('./routes/admin'));
app.use("/user",require('./routes/user'));
app.listen(PORT, (err) => {
   if(err){
    console.log("server is not connectd");
    return false;    
   }
   console.log("server is running in "+ PORT);
   
});
