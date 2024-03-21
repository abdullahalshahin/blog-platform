const UserModel = require('./../../Models/User');
const PostModel = require('./../../Models/Post');
const UserResource = require('./../Resources/UserResource');
const PostResource = require('./../Resources/PostResource');
const PostAllLikeResource = require('./../Resources/PostAllLikeResource');
const PostAllCommentResource = require('./../Resources/PostAllCommentResource');

const index = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const per_page = parseInt(req.query.per_page) || 10;
        const page = parseInt(req.query.page) || 1;
        const order_column = req.query.order_column || "updated_at";
        const order_type = req.query.order_type || "desc";

        const searchQuery = search_value ? { title: { $regex: search_value, $options: 'i' } } : {};
        const totalCount = await PostModel.countDocuments({ ...searchQuery, deleted_at: null });

        const post_query = await PostModel.find({ ...searchQuery, deleted_at: null })
            .populate('user', 'name email profile_image')
            .populate('comments.user', 'name email profile_image')
            .sort({ [order_column]: order_type })
            .skip((page - 1) * per_page)
            .limit(per_page);

        const posts = await Promise.all(post_query.map(async (post) => {
            return PostResource.Response(req, post);
        }));
    
        const pagination = {
            total_items: totalCount,
            per_page: per_page,
            current_page: page,
            last_page: Math.ceil(totalCount / per_page),
            from: (page - 1) * per_page + 1,
            to: Math.min(page * per_page, totalCount)
        };

        res.status(200).json({
            success: true,
            message: 'Data successfully!!!',
            result: {
                posts: posts,
                pagination: pagination
            }
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const post_show = async (req, res) => {
    try {
        const post_query = await PostModel.findById(req.params.post_id)
            .populate({
                path: 'user',
                select: 'name email profile_image'
            })
            .populate({
                path: 'comments.user',
                select: 'name email'
            });

        if (post_query && (post_query.deleted_at == null)) {
            const post = await PostResource.Response(req, post_query);

            return res.status(200).json({
                success: true,
                message: 'Show successfully!!!',
                result: {
                    post: post
                }
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Not Found!!!',
                result: {
                    post: null
                }
            });
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const post_all_likes = async (req, res) => {
    try {
        const post_like_query = await PostModel.findById(req.params.post_id)
            .select('likes')
            .populate('likes.user', 'name email profile_image');

        if (post_like_query) {
            const likes = await Promise.all(post_like_query.likes.map(async (post_like) => {
                return PostAllLikeResource.Response(req, post_like);
            }));

            return res.status(200).json({
                success: true,
                message: 'Show successfully!!!',
                result: {
                    likes: likes
                }
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Not Found!!!',
                result: {
                    post: null
                }
            });
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const post_all_comments = async (req, res) => {
    try {
        const post_comment_query = await PostModel.findById(req.params.post_id)
            .select('comments')
            .populate('comments.user', 'name email profile_image');

        if (post_comment_query) {
            const comments = await Promise.all(post_comment_query.comments.map(async (post_comment) => {
                return PostAllCommentResource.Response(req, post_comment);
            }));

            return res.status(200).json({
                success: true,
                message: 'Show successfully!!!',
                result: {
                    comments: comments
                }
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Not Found!!!',
                result: {
                    post: null
                }
            });
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const user_profile = async (req, res) => {
    try {
        const user_query = await UserModel.findById(req.params.user_id);

        if (user_query) {
            const user = await UserResource.Response(req, user_query);
            const total_post = await PostModel.countDocuments({ user: req.params.user_id });
            const user_posts = await PostModel.find({ user: req.params.user_id })
                .populate({
                    path: 'user',
                    select: 'name email profile_image'
                });

            const user_posts_response = await Promise.all(user_posts.map(async (post) => {
                return await PostResource.Response(req, post);
            }));

            user.total_posts = total_post;
            user.posts = user_posts_response;

            return res.status(200).json({
                success: true,
                message: 'Show successfully!!!',
                result: {
                    user: user
                }
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Not Found!!!',
                result: {
                    user: null
                }
            });
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    index,
    post_show,
    post_all_likes,
    post_all_comments,
    user_profile
};
