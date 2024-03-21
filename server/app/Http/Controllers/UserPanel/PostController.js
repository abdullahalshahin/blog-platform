const joi = require('joi');
const UserModel = require('./../../../Models/User');
const PostModel = require('./../../../Models/Post');
const PostResource = require('./../../Resources/PostResource');

const posts = async (req, res) => {
    try {
        const search_value = req.query.search || null;
        const per_page = parseInt(req.query.per_page) || 10;
        const page = parseInt(req.query.page) || 1;
        const order_column = req.query.order_column || "id";
        const order_type = req.query.order_type || "asc";

        const searchQuery = search_value ? { title: { $regex: search_value, $options: 'i' } } : {};
        const totalCount = await PostModel.countDocuments({ ...searchQuery, user: req.AuthUser._id, deleted_at: null });

        const post_query = await PostModel.find({ ...searchQuery, user: req.AuthUser._id, deleted_at: null })
            .populate('user', 'name email profile_image')
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

        if (post_query && (post_query.user._id.toString() == req.AuthUser._id.toString()) && (post_query.deleted_at == null)) {
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

const store = async (req, res) => {
    try {
        const schema = joi.object({
            title: joi.string().min(5).max(255).required(),
            description: joi.string().required(),
            tags: joi.array().items(joi.string()).optional(),
            status: joi.string().required().valid('draft', 'published'),
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data!!!',
                errors: error.details.map(err => err.message) 
            });
        }

        const { title, description, tags, status } = value;

        const PostModelSave = new PostModel({
            user: req.AuthUser._id,
            title: title,
            description: description,
            tags: tags,
            status: status
        });

        await PostModelSave.save();

        return res.status(200).json({
            success: true,
            message: "Created Successfully!!!"
        })
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const edit = async (req, res) => {
    try {
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
    
            if (post_query && (post_query.user._id.toString() == req.AuthUser._id.toString()) && (post_query.deleted_at == null)) {
                const post = await PostResource.Response(req, post_query);
    
                return res.status(200).json({
                    success: true,
                    message: 'Show successfully!!!',
                    result: {
                        post: post,
                        status: ['draft', 'published']
                    }
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'Not Found!!!',
                    result: {
                        post: null,
                        status: ['draft', 'published']
                    }
                });
            }
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

const update = async (req, res) => {
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

        if (post_query && (post_query.user._id.toString() == req.AuthUser._id.toString()) && (post_query.deleted_at == null)) {
            const schema = joi.object({
                title: joi.string().min(5).max(255).required(),
                description: joi.string().required(),
                tags: joi.array().items(joi.string()).optional(),
                status: joi.string().required().valid('draft', 'published'),
            });
    
            const { error, value } = schema.validate(req.body, { abortEarly: false });
    
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid data!!!',
                    errors: error.details.map(err => err.message) 
                });
            }
    
            const { title, description, tags, status } = value;

            post_query.title = title;
            post_query.description = description;
            post_query.tags = tags;
            post_query.status = status;
    
            await post_query.save();

            const post = await PostResource.Response(req, post_query);

            return res.status(200).json({
                success: true,
                message: 'Updated successfully!!!',
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

const delete_post = async (req, res) => {
    try {
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
    
            if (post_query && (post_query.user._id.toString() == req.AuthUser._id.toString()) && (post_query.deleted_at == null)) {
                post_query.deleted_at = Date.now();
        
                await post_query.save();

                return res.status(200).json({
                    success: true,
                    message: 'Deleted successfully!!!',
                    result: {
                        post: null
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
    catch (error) {
        res.status(400).json(error.message);
    }
}

const give_like = async (req, res) => {
    try {
        const post_query = await PostModel.findById(req.params.post_id);

        if (post_query && (post_query.deleted_at == null)) {
            const schema = joi.object({
                like_type: joi.string().required().valid('like', 'dislike', 'unlike'),
            });
    
            const { error, value } = schema.validate(req.body, { abortEarly: false });
    
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid data!!!',
                    errors: error.details.map(err => err.message) 
                });
            }
    
            const { like_type } = value;

            const userLikeIndex = post_query.likes.findIndex(like => like.user.equals(req.AuthUser._id));
            
            if (like_type === 'unlike') {
                if (userLikeIndex !== -1) {
                    post_query.likes.splice(userLikeIndex, 1);
                }
            }
            else {
                if (userLikeIndex !== -1) {
                    post_query.likes[userLikeIndex].type = like_type;
                }
                else {
                    post_query.likes.push({ user: req.AuthUser._id, type: like_type });
                }
            }

            await post_query.save();

            return res.status(200).json({
                success: true,
                message: 'Liked successfully!!!',
                result: {
                    post: null
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

const save_comment = async (req, res) => {
    try {
        const post_query = await PostModel.findById(req.params.post_id);

        if (post_query && post_query.deleted_at === null) {
            const schema = joi.object({
                text: joi.string().required().min(1).max(255)
            });
    
            const { error, value } = schema.validate(req.body, { abortEarly: false });
    
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid data!!!',
                    errors: error.details.map(err => err.message) 
                });
            }
    
            const { text } = value;

            post_query.comments.push({
                user: req.AuthUser._id,
                text: text
            });

            await post_query.save();

            return res.status(200).json({
                success: true,
                message: 'Comment saved successfully!!!',
            });
        } 
        else {
            return res.status(400).json({
                success: false,
                message: 'Post not found or deleted!!!',
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

const remove_comment = async (req, res) => {
    try {
        const post_query = await PostModel.findById(req.params.post_id);

        if (post_query && post_query.deleted_at === null) {
            const commentIndex = post_query.comments.findIndex(comment => {
                return comment._id.equals(req.params.comment_id) && comment.user.equals(req.AuthUser._id);
            });

            
            if (commentIndex !== -1) {
                post_query.comments.splice(commentIndex, 1);

                await post_query.save();

                return res.status(200).json({
                    success: true,
                    message: 'Comment removed successfully!!!',
                    result: {
                        post: null
                    }
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'You are not authorized to remove this comment or the comment does not exist!!!',
                    result: {
                        post: null
                    }
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Post not found or deleted!!!',
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


module.exports = {
    posts,
    post_show,
    store,
    edit,
    update,
    delete_post,
    give_like,
    save_comment,
    remove_comment
};