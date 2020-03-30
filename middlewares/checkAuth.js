

const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {


    const token = req.header('auth-token');
    if (!token){
        return res.status(400).json({
            status: 'fail',
            error: 'Unauthorized'
        });
    }


    try{

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(verified);
        req.user = verified;
        
    }catch(err){
        console.log(err);
        res.status(401).json({
            status: "fail",
            error: err
        });
    }

    next();
}


module.exports = checkAuth;