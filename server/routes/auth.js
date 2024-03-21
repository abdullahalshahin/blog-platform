const express = require('express');
const auth_controller = require('../app/Http/Controllers/Auth/AuthController');

const Route = express.Router();

Route.post('/login', auth_controller.login);
Route.post('/registration', auth_controller.registration);
Route.post('/forgot-password', auth_controller.forgot_password);

module.exports = {
	routes: Route
}
