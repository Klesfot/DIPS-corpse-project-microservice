/**
 * /api/user routes
 * @namespace UserRoutes
 */
const express = require('express');
const authorizationMiddleware = require('../middlewares/authorization.middleware');
const UserController = require('../controllers/user.controller');

const router = express.Router();
/**
 * Middleware to check auth
 */
router.use(authorizationMiddleware);
/**
 * @name Get user info
 * @memberof! UserRoutes
 * @path {GET} /api/user
 * @headers {string} user_id - user id
 * @code {200} Success
 * @code {500} Internal server error
 */
router.get('/', UserController.getUserInfo);
/**
 * @name Edit user info
 * @memberof! UserRoutes
 * @path {PUT} /api/user
 * @headers {string} user_id - user id
 * @body {string} phone_number - phone number
 * @body {string} middle_name - middle name
 * @body {string} first_name -first name
 * @body {string} last_name - last name
 * @body {string} email - email
 * @body {string} passport_serias - passport serial number
 * @body {string} passport_number - passport number
 * @code {200} Success
 * @code {500} Internal server error
 */
router.put('/', UserController.editUserInfo);
/**
 * @name Edit user password
 * @memberof! UserRoutes
 * @path {PUT} /api/user/password
 * @headers {string} user_id - user id
 * @body {string} old_password - old password
 * @body {string} new_password - new password
 * @code {200} Success
 * @code {500} Internal server error
 */
router.put('/password', UserController.editUserPassword);

module.exports = router;
