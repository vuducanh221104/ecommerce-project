const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/CommentController');
const jwtMiddleware = require('../middlewares/JwtMiddleware');

router.post('/', jwtMiddleware.verifyToken, CommentController.addComment);
router.get('/:slug', CommentController.commentPreview);

module.exports = router;
