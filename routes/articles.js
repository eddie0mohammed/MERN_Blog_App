
const express = require('express');

const articlesController = require('../controllers/articlesController');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();



// @route   POST /articles
// @desc    Create new article
// @access  Private***
router.post('/', checkAuth, articlesController.multerMiddleware, articlesController.createArticle);


// @route   GET /articles
// @desc    Get all articles
// @access  Public
router.get('/', articlesController.getArticles);


// @route   DELETE /articles:/:id
// @desc    Delete specific article
// @access  Private***
router.delete('/:articleId', checkAuth, articlesController.deleteArticle);


// @route   PATCH /articles/:id
// @desc    Update specific article
// @access  Private***
router.patch('/:articleId', checkAuth, articlesController.multerMiddleware, articlesController.updateArticle);


module.exports = router;