const Response = async (req = null, data) => {
    const base_url = req.protocol + '://' + req.get('host');

    const date_of_birth = data.date_of_birth
        ? new Date(data.date_of_birth).toISOString().split('T')[0]
        : null;

    const created_at = data.created_at
        ? new Date(data.created_at).toLocaleString()
        : null;

    return {
        id: data._id || null,
        name: data.name || null,
        gender: data.gender || null,
        date_of_birth: date_of_birth,
        phone_number: data.phone_number || null,
        email: data.email || null,
        address: data.address || null,
        about_me: data.about_me || null,
        profile_image: (data.profile_image) ? `${base_url}/images/users/${data.profile_image}` : `${base_url}/images/avator.png`,
        status: data.status || null,
        created_at: created_at || null,
    };
}

module.exports = {
    Response
};
