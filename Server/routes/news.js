const express = require('express');
const router = express.Router();
const NewsController = require('../Controllers/NewsController');
const jwtMiddleware = require('../middlewares/JwtMiddleware');

// News
router.get('/', NewsController.FindAllNews);
router.get('/:slug', NewsController.NewsDetails);
router.get('/latest', NewsController.NewsLatest);
// News Comment
router.post('/comment', jwtMiddleware.verifyToken, NewsController.PostComment);
router.get('/comment/:slug', NewsController.previewNewsComment);

module.exports = router;
