
const fs = require('fs');
const path = require('path');

const deleteFile = (filepath) => {
    
    fs.unlink(path.join(__dirname, '..', 'public', 'images', filepath), (err) => {
        if (err){
            console.log(err);
            throw (err);
            return ;
        }
    })
    // console.log(path.join(__dirname '..'));
}

module.exports = deleteFile;