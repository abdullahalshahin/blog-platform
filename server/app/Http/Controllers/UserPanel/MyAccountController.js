const bcrypt = require('bcrypt');
const joi = require('joi');
const User = require('./../../../Models/User');
const UserResource = require('../../Resources/UserResource');

const index = async (req, res) => {
    try {
        const AuthUser = req.AuthUser;

        return res.status(200).json({
            status: 'success',
            message: 'Data Show successfully!!!',
            result: {
                user: await UserResource.Response(req, AuthUser)
            }
        });
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

const update = async (req, res) => {
    try {
        const AuthUser = req.AuthUser;

        const schema = joi.object({
            name: joi.string().min(3).max(100).required(),
            gender: joi.string().valid('male', 'female', 'others').required(),
            date_of_birth: joi.date().iso().required(),
            // phone_number: joi.string().min(11).max(15).required(),
            // email: joi.string().min(3).max(50).required(),
            // password: joi.string().min(6).required(),
            address: joi.string().optional().allow(''),
            about_me: joi.string().optional().allow(''),
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data!!!',
                errors: error.details.map(err => err.message) 
            });
        }

        const { name, gender, date_of_birth, password, address, about_me } = value;

        // const hashedPassword = (password) ? await bcrypt.hash(password, 10) : AuthUser.password;

        AuthUser.name = name;
        AuthUser.gender = gender;
        AuthUser.date_of_birth = date_of_birth;
        // AuthUser.password = hashedPassword;
        // AuthUser.security = password;
        AuthUser.address = address || null;
        AuthUser.about_me = about_me || null;

        await AuthUser.save();

        return res.status(200).json({
            status: 'success',
            message: 'Updated successfully!!!',
            result: {
                user: await UserResource.Response(req, AuthUser)
            }
        });
    } 
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    index,
    update
}
