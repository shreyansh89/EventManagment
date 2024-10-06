const express = require('express');

const routes = express.Router();
const admincontroller = require('../controller/admincontroller')

routes.post('/register', admincontroller.register);

routes.post('/login',admincontroller.login)

routes.get("/faillogin", async (req, res) => {
    return res.status(400).json({ msg: "Admin not login", status: 0 });
});




module.exports = routes;