const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg:"NO Token, Authorization denied"})
    }

    try {

    const decoded = jwt.verify(token,'Overlor1d');
    req.user = decoded.user;
    next();

    } catch (error) {
        return res.status(401).json({msg:"Token not valid"});
    }

}