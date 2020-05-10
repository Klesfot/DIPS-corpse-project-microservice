/**
 * /api/admin routes
 * @namespace AdminRoutes
 */
const express = require('express');
const authorizationMiddleware = require('../middlewares/authorization.middleware');
const AdminController = require('../controllers/admin.controller');

const router = express.Router();
/**
 * Middleware checking auth
 */
router.use(authorizationMiddleware);
/**
 * Middleware checking that user is admin
 */
router.use((req, res, next) => {
  if (req.headers.is_admin) return next();
  return res.sendErr({ statusCode: 403, message: 'You are not an administrator' });
});
/**
 * @name Get user info
 * @memberof! AdminRoutes
 * @path {GET} /api/admin
 * @headers {string} user_id - admin/user id
 * @query {string} user_id - id of a user to get info about
 * @code {200} Success
 * @code {500} Internal server error
 */
router.get('/', AdminController.getUsers);
/**
 * @name Edit user info
 * @memberof! AdminRoutes
 * @path {PUT} /api/admin
 * @headers {string} user_id - admin/user id
 * @body {string} user_id - id of a user to get info about
 * @body {string} phone_number - phone number
 * @body {string} middle_name - middle name
 * @body {string} first_name - first name
 * @body {string} last_name - last name
 * @body {string} email - email
 * @body {string} passport_serias - passport serial number e.g.(AD)
 * @body {string} passport_number - passport number
 * @code {200} Success
 * @code {500} Internal server error
 */
router.put('/', AdminController.editUserInfo);
/**
 * @name Edit user password
 * @memberof! UserRoutes
 * @path {PUT} /api/admin/password
 * @headers {string} user_id - admin/user id
 * @body {string} user_id - id of a user to edit info about
 * @body {string} new_password - new password
 * @code {200} Success
 * @code {500} Internal server error
 */
router.put('/password', AdminController.editUserPassword);
/**
 * @name Delete user
 * @memberof! UserRoutes
 * @path {DELETE} /api/admin
 * @headers {string} user_id - admin/user id
 * @query {string} user_id - id of a user to delete
 * @code {200} Success
 * @code {500} Internal server error
 */
router.delete('/', AdminController.deleteUser);

module.exports = router;
