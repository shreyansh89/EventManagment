const path = require('path');
const fs = require('fs');

const User = require('../model/userpanel');

module.exports.addEvent = async (req, res) => {
    try {
        const ImagePath = ""; // Changed from const to let
        if (req.file) {
            ImagePath = User.UserModelPath + "/" + req.file.filename;
        } else {
            return res.status(400).json({ mes: "Image not found", status: 0 });
        }

        if (req.body) {
            req.body.UserImg = ImagePath;
            req.body.date = new Date().toLocaleDateString();
            const Newdata = await User.create(req.body);
            if (Newdata) {
                return res.status(200).json({ mes: "Data inserted successfully", Newdata: Newdata, status: 1 });
            } else {
                return res.status(400).json({ mes: "Data not found", status: 0 });
            }
        } else {
            return res.status(200).json({ mes: "Data not found", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ mes: "Something went wrong", status: 0 });
    }
}


module.exports.AllEventView = async (req, res) => {
    try {
        const viewData = await User.find()

        const { date, location, eventType } = req.query;

       
        let filter = {};

        if (date) {
         
            const start = new Date(date);
            const end = new Date(date);
            end.setDate(end.getDate() + 1); 
            filter.date = { $gte: start, $lt: end };
        }

        if (location) {
        
            filter.location = { $regex: new RegExp(location, "i") };
        }

        if (eventType) {
           
            filter.eventType = { $regex: new RegExp(eventType, "i") };
        }

       
        const events = await User.find(filter).populate('CreateBy', 'name email');

        return res.status(200).json({ mes: "Events fetched successfully", events: events, status: 1 });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}

module.exports.deleteEvent = async (req, res) => {

    try {
        let olddata = await User.findById(req.params.id);
        if (olddata) {
            let oldImage = olddata.UserImg;
            if (oldImage) {
                let fullpath = path.join(__dirname, ".." + olddata.UserImg);
                let dImage = await fs.unlinkSync(fullpath);
                let deleteRecord = await User.findByIdAndDelete(req.params.id);
                if (deleteRecord) {
                    return res.status(200).json({ mes: "Delete record sucessfully", deleteRecord: deleteRecord, status: 1 });
                } else {
                    return res.status(200).json({ mes: "Record delete successfully", status: 0 });
                }
            } else {
                let deleteRecord = await User.findByIdAndDelete(req.params.id);
                if (deleteRecord) {
                    return res.status(200).json({ mes: "Delete record sucessfully", deleteRecord: deleteRecord, status: 1 });
                } else {
                    return res.status(200).json({ mes: "Record delete successfully", status: 0 });
                }
            }
        } else {

            return res.status(200).json({ mes: "Record not found", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}



module.exports.updateEvent = async (req, res) => {
    try {
        if (req.file) {

            const oldimgData = await User.findById(req.params.id);

            if (oldimgData.UserImg) {
                const FullPath = path.join(__dirname, "../../../..", oldimgData.UserImg);

                await fs.unlinkSync(FullPath);
            }
            var imagePath = '';
            imagePath = User.UserModelPath + "/" + req.file.filename;
            req.body.UserImg = imagePath;
        }
        else {
            const olddata = await User.findById(req.params.id);
            var imgpath = '';
            if (olddata) {
                imgpath = olddata.UserImg;
            }
            req.body.UserImg = imgpath;
        }

        const userupdated = await User.findByIdAndUpdate(req.params.id, req.body);

        if (userupdated) {
            return res.status(200).json({ msg: 'Data Updated Succ....', status: 1, rec: userupdated });
        }
        else {
            return res.status(400).json({ msg: 'not Updated Succ..', status: 0 });
        }

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}