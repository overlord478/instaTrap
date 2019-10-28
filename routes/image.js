const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Image = require('../database/ImageSchema');

//setting storage engine

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        const uploadDir = path.join(__dirname,"..","public","uploads")
        
        cb(null,uploadDir)
    },
    filename:function(req,file,cb) {
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
});

// setting  upload

const upload = multer({storage});


//setting up route handler
router.post('/',upload.single('image'),async(req,res)=>{

    console.log(req.file);
   
    const newImage = new Image()
    newImage.image.data = fs.readFileSync(req.file.path)
    newImage.image.contentType = req.file.mimetype


    try {
       const response = await newImage.save()
       res.send("Image added successfully")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
