const UserModel = require('./../../../Models/User');
const PostModel = require('./../../../Models/Post');
const PostResource = require('./../../Resources/PostResource');

const index = async (req, res) => {
    try {
        const totalPosts = await PostModel.countDocuments({ user: req.AuthUser._id });
        const totalDraftPosts = await PostModel.countDocuments({ user: req.AuthUser._id, status: 'draft' });
        const totalPublishedPosts = await PostModel.countDocuments({ user: req.AuthUser._id, status: 'published' });

        return res.status(200).json({
            success: true,
            message: 'Post statistics retrieved successfully!',
            result: {
                total_posts: totalPosts,
                total_draft_posts: totalDraftPosts,
                total_published_posts: totalPublishedPosts
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
    index
};
