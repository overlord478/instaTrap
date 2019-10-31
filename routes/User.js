const express = require('express');
const router = express.Router();
const User = require('../database/UserSchema');

router.post('/',async(req,res)=>{
        
        const response = await User.findOne({email:req.body.email})
        res.send(response.name)
        //console.log(response.name)
        
});

module.exports = router;