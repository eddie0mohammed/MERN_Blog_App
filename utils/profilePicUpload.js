
const multer = require('multer');



//MULTER
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profilePic');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname.split('.')[0]}.${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    //check ext
    const fileTypes = /jpeg|jpg|png|gif/;
    const ext = file.mimetype.split('/')[1];
    const checkExt = fileTypes.test(ext);

    //check both mimetype and ext
    if (file.mimetype.startsWith('image') && checkExt){
        cb(null, true);
    }else{
        const ERROR = {message: 'Format not supported. Please upload an image'};
        cb(ERROR, false);
    }   
}

//multer config 
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {fileSize: 2000000}
});

const uploadPhoto = upload.single('profilePic');


module.exports = uploadPhoto;