
const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,

    },
    password: {
        type: String,
    }
});

const Adminpanel = mongoose.model('admin', AdminSchema);
module.exports = Adminpanel;
