// Private route to get images,post images,delete images

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const Image = require('../database/ImageSchema');


// initilazing the storage
const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        const uploadDir = path.join(__dirname,"..","public","uploads")
        cb(null,uploadDir);
    },

    filename:function(req,file,cb) {
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
    }

});
// initlizing the upload 
const upload = multer({storage})


// route to get all images
router.get('/',auth,async(req,res)=>{
    

try {
    
    const images = await Image.find({user:req.user.id})
    res.json(images)    
} catch (error) {
    console.error(error.message);
        res.status(500).send("Internal server error")
}

});

// get one latest uploaded image 


router.get('/one',auth,async(req,res)=>{

    try {
        const image = await Image.findOne({user:req.user.id}).sort({_id:-1})
        res.json(image)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

});

// route to post image for resp.user

router.post('/',[auth,upload.single('image')],async(req,res)=>{
    
    
   

    const newImage = new Image({
        user:req.user.id,
        
        image:{
            data:fs.readFileSync(req.file.path),
            contentType:req.file.mimetype
        }
    });

    try {
        const response = await newImage.save();
        res.json({msg:"Image added successfully"})
    } catch (error) {
        console.error(error.message);
       return res.status(500).send("internal server error");
    }

});

// route to delete image

router.delete('/:id',auth,async(req,res)=>{
    
        
    const response = await Image.deleteOne({_id:req.params.id})
    res.json({msg:"Image deleted successfully"})
});


module.exports = router;



