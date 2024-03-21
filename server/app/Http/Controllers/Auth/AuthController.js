const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config_app = require('../../../../config/app');
const User = require('./../../../Models/User');
const UserResource = require('../../Resources/UserResource');

const login = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().required(),
            password: joi.string().required()
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data!!!',
                errors: error.details.map(err => err.message) 
            });
        }

        const { email, password } = value;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign({ userId: user._id }, config_app.app_key);

        return res.status(200).json({
            success: true,
            message: "Login Successfully!!!",
            result: {
                user: UserResource.Response(req, user),
                token: token,
            }
        })
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

const registration = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(3).max(100).required(),
            gender: joi.string().valid('male', 'female', 'others').required(),
            date_of_birth: joi.date().iso().required(),
            phone_number: joi.string().min(11).max(15).required(),
            email: joi.string().min(3).max(50).required(),
            password: joi.string().min(6).max(50).required(),
            address: joi.string().optional().allow(''),
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data!!!',
                errors: error.details.map(err => err.message) 
            });
        }
        
        const { name, gender, date_of_birth, phone_number, email, password, address } = value;

        const existingUser = await User.findOne({ $or: [{ email }, { phone_number }] });

        if (existingUser) {
            let message = '';
            
            if (existingUser.email === email && existingUser.phone_number === phone_number) {
                message = 'email and phone number already exist';
            } else if (existingUser.email === email) {
                message = 'email already exists';
            } else {
                message = 'Phone number already exists';
            }

            return res.status(400).json({
                success: false,
                message
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name: name,
            gender: gender,
            date_of_birth: date_of_birth,
            phone_number: phone_number,
            email: email,
            password: hashedPassword,
            security: password,
            address: address,
            status: 'active'
        });

        await newUser.save();

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, config_app.app_key);

        return res.status(200).json({
            success: true,
            message: "Registered Successfully!!!",
            result: {
                user: UserResource.Response(req, newUser),
                token: token,
            }
        })
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

const forgot_password = async (req, res, next) => {
    try {
        //
    }
    catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    login,
    registration,
    forgot_password
};
