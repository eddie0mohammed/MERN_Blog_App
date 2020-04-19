

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/user');
const sendMail = require('../utils/sendMail');

const uploadPhoto = require('../utils/profilePicUpload');
const deleteFile = require('../utils/deleteProfilePicture');


//multer middleware 
const multerMiddleware = (req, res, next) => {
    uploadPhoto(req, res, (err) => {
        
        
        if (err){
            // console.log(err)
            return res.status(400).json({
                status: 'fail',
                error: err
            });
        }else{
            next();
        }
    })
}



//REGISTER
const register = async (req, res, next) => {

    //validate
    const {username, email, password} = req.body;
    
    if (!username || !email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Username, email and password required'
        });
    }

    try{

        //check if email exists already in DB
        const exists = await User.findOne({email: req.body.email});
        if (exists){
            return res.status(400).json({
                status: 'fail',
                error: 'Email already exists in DB'
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //activationToken
        const activationToken = crypto.randomBytes(32).toString('hex');
        // console.log(activationToken);
        const hashedToken = crypto.createHash('sha256').update(activationToken).digest('hex');
        
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            activationToken: hashedToken
        });

        await user.save();

        //send activation email
         const activationURL = `${req.protocol}://${req.get('host')}/auth/validate/${activationToken}`;
        //message
        // const message = `Click here to activate your profile and login: ${activationURL}`;


        //send email
        await sendMail({
            // email: 'test@test.com', //mailtrap service
             email: req.body.email, //used for production
            // email: 'alperceylan52@gmail.com', //used for testing on gmail
            subject: 'ACCOUNT ACTIVATION EMAIL',
            // message: message,
            URL: activationURL,
            emailType: 'activation'
        });



        res.status(201).json({
            status: 'success',
            message: 'New user successfully created',
            data: {
                user: user
            }
        });


    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}


//LOGIN
const login = async (req, res, next) => {

    //validate
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Email and password required'
        });
    }

    try{
        //check if user exists
        const user = await User.findOne({email: email});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            });
        }

        //check if user account is activated
        if (!user.active){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            })
        }

        //check password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            });
        }

        //token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 3600});
        //include token in header
        res.header('auth-token', token);

        res.status(200).json({
            status: 'success',
            token: token,
            data: {
                user: user
            }
        });




    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}



const validateAccount = async (req, res, next) => {

    let token = req.params.token;
    if (!token){
        return res.status(401).status({
            status: 'fail',
            error: 'Unauthorized'
        });
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    try{
        const user = await User.findOne({activationToken: hashedToken});
        if (!user){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }

        user.active = true;
        user.activationToken = null,
        await user.save();

        if (process.env.NODE_ENV === 'development'){
            return res.redirect('http://localhost:3000/auth/login');
        }
        res.redirect('/auth/login');    


    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
    
}


const getUser = async (req, res, next) => {
    
    try{
        if (!req.user){
            return res.status(400).json({
                status: 'fail',
                error: 'Unauthorized'
            })
        }

        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(401).json({
                status: 'fail', 
                error: 'Unauthorized'
            });    
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        });

    }catch(err){
        console.log(err);
        res.status(401).json({
            status: 'fail', 
            error: err
        });
    }

}


const forgotPassword = async (req, res, next) => {

    try{
        // 1. get user based on email
        const user = await User.findOne({email: req.body.email});

        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
            });
        }

        // 2. generate random token
        //password reset Token
        const passwordResetToken = crypto.randomBytes(32).toString('hex');
        
        const hashedToken = crypto.createHash('sha256').update(passwordResetToken).digest('hex');
    
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + (10 * 60 * 1000);
        await user.save({validateBeforeSave: false});

        // 3. send email
        //passwordResetURL
        const passwordResetURL = `${req.protocol}://${req.get('host')}/auth/resetPassword/${passwordResetToken}`;
        
        // //message
        // const message = `Click here to reset your password: ${passwordResetURL}`;

        await sendMail({
            // email: 'test@test.com',
            email: req.body.email, // for production
            subject: 'PASSWORD RESET EMAIL',
            // message: message
            emailType: 'forgotPassword',
            URL: passwordResetURL
        });

        res.status(200).json({
            status: 'success',
            message: 'Password reset email sent'
        });

    }catch(err){
        console.log(err);
        
    }

}

const redirectToResetPassword = (req, res, next) => {

    const token = req.params.token;
    if (process.env.NODE_ENV === 'development'){
        return res.redirect(`http://localhost:3000/auth/resetPassword/${token}`);

    }
    res.redirect(`/auth/resetPassword/${token}`);
}

const resetPassword = async (req, res, next) => {

    try{

        // 1.  get user based on token
        const token = req.params.token;
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({passwordResetToken: hashedToken});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: "No user found"
            });
        }

        // 2. if token has not expired, and there is user, set the new password
        if (user.passwordResetExpires < Date.now()){
            return res.status(400).json({
                status: 'fail',
                error: 'Token expired'
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // 3. update the password
        
        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        await user.save({validateBeforeSave: false});

        res.status(201).json({
            status: 'success',
            message: 'Password successfully updated',
            // user: user
        })

    }catch(err){
        console.log(err);
    }



}

const resetMyPassword = async (req, res, next) => {

    try{
        // 1. find user by id from token
        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: "No user found"
            });
        }

        // 2. check if current password provided matches the one in db
        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch){
            return res.status(400).json({
                status: 'fail',
                error: 'Current Password Invalid'
            });
        }

        // 3. create new hashed password
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(201).json({
            status: 'success',
            data: {
                user: user
            }
        })

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}

const changePicture = async (req, res, next) => {

    try{
        // 1. find user by id from token
        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: "No user found"
            });
        }
        
        const body = {};
        //2, check if there is a file
        if (req.file){
            if (user.profilePic !== '1.jpg'){
                deleteFile(user.profilePic);
            }
            body.profilePic = req.file.filename
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, body, {new: true, runValidators: true});

        res.status(201).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        })

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

module.exports = {
    register: register,
    login: login,
    validateAccount: validateAccount,
    getUser:  getUser,
    forgotPassword: forgotPassword,
    redirectToResetPassword: redirectToResetPassword,
    resetPassword: resetPassword,
    resetMyPassword: resetMyPassword,
    multerMiddleware: multerMiddleware,
    changePicture: changePicture
}