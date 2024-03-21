const express = require('express');
const authenticatedUserMiddleware = require('./../app/Http/Middleware/AuthenticatedUser');
const PublicPageController = require('./../app/Http/Controllers/PublicPageController');
const DashboardController = require('./../app/Http/Controllers/UserPanel/DashboardController');
const PostController = require('./../app/Http/Controllers/UserPanel/PostController');
const MyAccountController = require('./../app/Http/Controllers/UserPanel/MyAccountController');

const Route = express.Router();

// PUBLIC page API section
Route.get('/index', PublicPageController.index);
Route.get('/posts/:post_id/show', PublicPageController.post_show);
Route.get('/posts/:post_id/all-likes', PublicPageController.post_all_likes);
Route.get('/posts/:post_id/all-comments', PublicPageController.post_all_comments);
Route.get('/user-profile/:user_id', PublicPageController.user_profile);

// USER panel route section
Route.get('/user-panel/dashboard/', authenticatedUserMiddleware, DashboardController.index);

Route.get('/user-panel/dashboard/posts', authenticatedUserMiddleware, PostController.posts);
Route.get('/user-panel/dashboard/posts/:post_id/show', authenticatedUserMiddleware, PostController.post_show);
Route.post('/user-panel/dashboard/posts/store', authenticatedUserMiddleware, PostController.store);
Route.get('/user-panel/dashboard/posts/:post_id/edit', authenticatedUserMiddleware, PostController.edit);
Route.put('/user-panel/dashboard/posts/:post_id/update', authenticatedUserMiddleware, PostController.update);
Route.delete('/user-panel/dashboard/posts/:post_id/delete', authenticatedUserMiddleware, PostController.delete_post);

Route.put('/user-panel/dashboard/posts/:post_id/give-like', authenticatedUserMiddleware, PostController.give_like);
Route.put('/user-panel/dashboard/posts/:post_id/save-comment', authenticatedUserMiddleware, PostController.save_comment);
Route.put('/user-panel/dashboard/posts/:post_id/remove-comment/:comment_id', authenticatedUserMiddleware, PostController.remove_comment);

Route.get('/user-panel/dashboard/my-account', authenticatedUserMiddleware, MyAccountController.index);
Route.put('/user-panel/dashboard/my-account-update', authenticatedUserMiddleware, MyAccountController.update);

module.exports = {
	routes: Route
}
