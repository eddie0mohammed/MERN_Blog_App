

const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {

    const token = req.header('auth-token');
    // console.log(token);
    if (!token){
        return res.status(400).json({
            status: 'fail',
            error: 'Unauthorized'
        });
    }


    try{

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(verified);
        if (!verified){
            return res.status(400).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }else{

            req.user = verified;
            next();
        }
        
    }catch(err){
        console.log(err);
        return res.status(401).json({
            status: "fail",
            error: err
        });
    }

    
}


module.exports = checkAuth;