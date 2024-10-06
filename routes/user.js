const express = require('express');
const routes = express.Router();
const Passport = require('passport');
const userpanel = require('../model/userpanel');
const usercontroller = require('../controller/usercontroller');


routes.post('/addEvent', userpanel.UploadUserImg, Passport.authenticate("userverify", { failureRedirect: "/admin/faillogin" }), usercontroller.addEvent);

routes.get("/AllEventView", usercontroller.AllEventView)

routes.delete('/deleteEvent/:id', usercontroller.deleteEvent);

routes.put('/updateEvent/:id', usercontroller.updateEvent);



module.exports = routes;