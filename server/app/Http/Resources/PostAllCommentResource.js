const UserResource = require('./UserResource');

const Response = async (req = null, comment) => {
    const base_url = req.protocol + '://' + req.get('host');

    const created_at = comment.created_at
        ? new Date(comment.created_at).toLocaleString()
        : "";

    return {
        text: comment.text || "",
        created_at: created_at,
        user: {
            id: comment.user._id || "",
            name: comment.user.name || "",
            email: comment.user.email || "",
            profile_image: (comment.user.profile_image) ? `${base_url}/images/users/${comment.user.profile_image}` : `${base_url}/images/avator.png`
        }
    };
}

module.exports = {
    Response
};
