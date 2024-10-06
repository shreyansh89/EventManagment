const mongoose = require('mongoose');
const multer = require('multer');
const imagepath = "/upload";
const path = require('path');


const UserSchema = mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: String
    },
    location: {
        type: String
    },
    maxAttendees: {
        type: Number,
        min: 1
    },
    eventType: {
        type: String,
    },
    UserImg: {
        type: String
    },
    CreateBy: {
        type: mongoose.Schema.ObjectId,
        ref: "admin",
    },

})

const imgstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imagepath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
});


UserSchema.statics.UploadUserImg = multer({ storage: imgstorage }).single("UserImg");
UserSchema.statics.UserModelPath = imagepath;

const userpanel = mongoose.model('user', UserSchema);
module.exports = userpanel;
