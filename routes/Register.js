// code to register a user to the database

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/UserSchema');

router.post('/',async(req,res)=>{

const {name,email,password} = req.body;


try {
    
   let user = await User.findOne({email});

   if(user) {
       return res.status(400).json({msg:"User already exists"})
   }
   user = new User({
       name,
       email,
       password
   });

   const salt = await bcrypt.genSalt(10);

   user.password = await bcrypt.hash(password,salt);

   await user.save();

   const payload = {
       user:{
           id:user.id
       }
   }

   jwt.sign(payload,"Overlor1d",{expiresIn:3600},(err,token)=>{
       if(err) throw err;
       res.json({token})
   })

} catch (error) {
    console.error(error.message); 
        res.status(500).send("Server Error");
}

});

module.exports = router;
