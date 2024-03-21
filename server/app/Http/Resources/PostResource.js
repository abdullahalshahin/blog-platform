const UserResource = require('./UserResource');

const Response = async (req = null, post) => {
    const base_url = req.protocol + '://' + req.get('host');

    const created_at = post.created_at
        ? new Date(post.created_at).toLocaleString()
        : "";

    const updated_at = post.updated_at
        ? new Date(post.updated_at).toLocaleString()
        : "";

    let likesCount = 0;
    let dislikesCount = 0;

    if (post.likes && post.likes.length > 0) {
        post.likes.forEach(like => {
            if (like.type === 'like') {
                likesCount++;
            } else if (like.type === 'dislike') {
                dislikesCount++;
            }
        });
    }

    const totalComments = post.comments ? post.comments.length : 0;

    const latestTwoComments = post.comments
        // ? post.comments.slice().reverse().slice(0, 2).map(comment => ({
            ? post.comments.slice().reverse().map(comment => ({
            user: comment.user,
            text: comment.text,
            created_at: new Date(comment.created_at).toLocaleString()
        }))
        : [];

    return {
        _id: post.id || "",
        title: post.title || "",
        description: post.description || "",
        tags: post.tags || [],
        status: post.status || "",
        created_at: created_at,
        updated_at: updated_at,
        total_likes: likesCount,
        total_dislikes: dislikesCount,
        total_comments: totalComments,
        latest_two_comments: latestTwoComments,
        user: {
            id: post.user._id || "",
            name: post.user.name || "",
            email: post.user.email || "",
            profile_image: (post.user.profile_image) ? `${base_url}/images/users/${post.user.profile_image}` : `${base_url}/images/avator.png`
        }
    };
}

module.exports = {
    Response
};
