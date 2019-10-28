const express = require('express');
const Image = require('../database/ImageSchema')
const route = express.Router();

route.get('/',(req,res)=>{
    Image.find({}).exec((err,img)=>{
        if(err) {
            console.log("Error retriving data");
        }
        else {
            res.json(img);
        }
    })
})

module.exports = route;