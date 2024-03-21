const UserResource = require('./UserResource');

const Response = async (req = null, like) => {
    const base_url = req.protocol + '://' + req.get('host');

    return {
        type: like.type || "",
        user: {
            id: like.user._id || "",
            name: like.user.name || "",
            email: like.user.email || "",
            profile_image: (like.user.profile_image) ? `${base_url}/images/users/${like.user.profile_image}` : `${base_url}/images/avator.png`
        }
    };
}

module.exports = {
    Response
};
