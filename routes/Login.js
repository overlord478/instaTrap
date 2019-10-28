// User Login and give the jwt token

const express = require('express');
const route = express.Router();
const User = require('../database/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

route.post('/',async(req,res)=>{


const {email,password} = req.body

    if(email === null) {
        return res.status(400).json({msg:"Enter valid email"})
    }
    try {
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({msg:"Invalid creds"})
        }

        const passMatch = await bcrypt.compare(password,user.password)

        if(!passMatch) {
            return res.status(400).json({msg:"Invalid creds"})
        }

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,"Overlor1d",{expiresIn:3600},(err,token)=>{
            if(err) throw err;
            res.json({token});
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

module.exports = route;