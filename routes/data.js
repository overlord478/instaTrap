const express = require('express')
const router = express.Router()




// Adding user to database
router.post('/',async(req,res)=>{
    const user = new User({
        id:req.body.id,
        name:req.body.name
    })
    try {
        await user.save();
        res.send('User added successfully');
    }
    catch (err) {
        console.error(err)
    }
    
});





module.exports = router;


