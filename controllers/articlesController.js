

const Article = require('../models/article');
const uploadPhoto = require('../utils/imageUpload');


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


const createArticle = async (req, res, next) => {
    
    //validate
    const {title, article} = req.body;
    if (!title || !article){
        return res.status(400).json({
            status: 'fail',
            error: 'Title and article required'
        });
    }

    // console.log(req.user);

    const newArticle = new Article({
        title: req.body.title,
        article: req.body.article,
        author: req.user.id
    });

    if (req.file){
        newArticle.imageURL = req.file.filename;
    }else{
        return res.status(400).json({
            status: 'fail',
            error: 'Image is required'
        });
    }

    try{

        const temp = await newArticle.save();
        const newlySavedArticle = await Article.findById(temp._id).populate('author');
        res.status(201).json({
            status: 'success',
            message: 'New article created',
            data: {
                article: newlySavedArticle
            }
        });


    }catch(err){
        console.log(err);
        return res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}


const getArticles = async (req, res, next) => {

    try{

        // const articles = await Article.find().select('_id imageURL title article createdAt').populate('author');
        const articles = await Article.find().populate('author');

        res.status(200).json({
            status: 'success',
            data: {
                articles: articles
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


const deleteArticle = async (req, res, next) => {
    try{
        
        const id = req.params.articleId;
        const article = await Article.findById(id).populate('author');
        // console.log(article.author._id);
        // console.log(req.user.id);
        if (req.user.id != article.author._id){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        } 

        await Article.findByIdAndDelete(id);

        res.status(200).json({
            status: 'success',
            message: 'Article successfully deleted'
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


const updateArticle = async (req, res, next) => {

    try{
        // console.log(req.body);
        // console.log(req.file);

        const id = req.params.articleId;
        const body = {
            createdAt: Date.now()
        };
        if (req.body.title){
            body.title = req.body.title;
        }
        if (req.body.article){
            body.article = req.body.article;
        }
        if (req.file){
            body.imageURL = req.file.filename;
        }
        const updatedArticle = await Article.findByIdAndUpdate(id, body, {new: true, runValidators: true});

        res.status(201).json({
            status: 'success',
            message: 'Article updated',
            data: {
                article: updatedArticle
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


module.exports = {
    createArticle: createArticle,
    getArticles: getArticles,
    deleteArticle: deleteArticle,
    updateArticle: updateArticle,
    multerMiddleware: multerMiddleware
}