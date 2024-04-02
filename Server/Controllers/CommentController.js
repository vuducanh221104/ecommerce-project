const Comment = require('../Models/Comment');

class CommentController {
    async addComment(req, res) {
        try {
            const { slug, fullname, comment, stars } = req.body;

            let newComment;

            // Find the Comment based on the slug
            const existingComment = await Comment.findOne({ slug });

            if (existingComment) {
                // If the Comment exists, push the new comment data
                existingComment.content.push({ fullname, comment, stars });
                newComment = await existingComment.save();
            } else {
                // If the Comment doesn't exist, create a new one
                newComment = await Comment.create({
                    slug,
                    content: [{ fullname, comment, stars }],
                });
            }

            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
    //[GET]
    async commentPreview(req, res) {
        try {
            const slug = req.params.slug;

            // Try to find a comment with the given slug
            const find = await Comment.findOne({ slug });

            if (find) {
                // Nếu có comment được tìm thấy, sắp xếp các comment theo createdAt mới nhất
                find.content.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                res.status(200).json(find);
            } else {
                // Nếu không có comment được tìm thấy, tạo một comment mới
                const newComment = await Comment.create({
                    slug,
                    content: [],
                });
                res.status(200).json(newComment);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = new CommentController();
