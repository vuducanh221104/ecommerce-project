const NewsSchema = require('../Models/News');

class NewsController {
    // [GET]/news ~Find All Post News
    async FindAllNews(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;

            const data = await NewsSchema.find({}).limit(limit).sort({ createdAt: -1 });
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: error });
        }
    }

    // [GET]/news/:slug ~Find One News Details
    async NewsDetails(req, res, next) {
        try {
            const slug = req.params.slug;
            const data = await NewsSchema.findOne({ slug });
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: error });
        }
    }

    async NewsLatest(req, res, next) {
        try {
            const articlesWithLatestComments = await NewsSchema.aggregate([
                {
                    $match: {
                        comment: { $exists: true, $ne: [] }, // Chỉ lấy bài có ít nhất một comment
                    },
                },
                {
                    $addFields: {
                        latestComment: { $arrayElemAt: ['$comment', -1] }, // Lấy comment cuối cùng
                    },
                },
                {
                    $sort: { 'latestComment.createdAt': -1 }, // Sắp xếp theo thời gian tạo comment gần nhất giảm dần
                },
                {
                    $limit: 5, // Giới hạn số lượng bài viết
                },
            ]);

            res.status(200).json(articlesWithLatestComments);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    // [POST]
    async PostComment(req, res, next) {
        try {
            const { slug, fullname, comment_content } = req.body;
            let newComment;

            // Find the Comment based on the slug
            const existingComment = await NewsSchema.findOne({ slug });

            if (existingComment) {
                // If the Comment exists, push the new comment data
                existingComment.comment.push({ fullname, comment_content });
                newComment = await existingComment.save();
            } else {
                // If the Comment doesn't exist, create a new one
                newComment = await NewsSchema.create({
                    slug,
                    comment: [{ fullname, comment_content }],
                });
            }

            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    //  [GET]
    async previewNewsComment(req, res, next) {
        try {
            const slug = req.params.slug;
            const find = await NewsSchema.findOne({ slug });
            res.status(200).json(find);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async NewsLimit(req, res, next) {
        try {
            const data = await NewsSchema.find({}).limit(6).sort({ createdAt: -1 });
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ message: error });
        }
    }
}

module.exports = new NewsController();
