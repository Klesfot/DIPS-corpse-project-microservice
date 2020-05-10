/**
 * /api/authorization routes
 * @namespace AuthorizationRoutes
 */
const express = require('express');
const AuthorizationController = require('../controllers/authorization.controller');

const router = express.Router();
/**
 * @name Register new user
 * @memberof! AuthorizationRoutes
 * @path {POST} /api/authorization/signup
 * @body {string} phone_number - phone number
 * @body {string} password - password
 * @body {string} middle_name - middle name
 * @body {string} first_name - first name
 * @body {string} last_name - last name
 * @body {string} passport_serias - passport serial number
 * @body {string} passport_number - passport number
 * @body {string} email - email
 * @code {200} Success
 * @code {500} Internal server error
 */
router.post('/signup', AuthorizationController.signUp);
/**
 * @name Auth of user
 * @memberof! AuthorizationRoutes
 * @path {POST} /api/authorization/login
 * @body {string} email - user email
 * @body {string} password - password
 * @code {200} Success
 * @code {500} Internal server error
 */
router.post('/login', AuthorizationController.login);
/**
 * @name Check user auth
 * @memberof! AuthorizationRoutes
 * @path {POST} /api/authorization/token/check
 * @headers user_id - user id
 * @headers authorization - auth token
 * @code {200} Success
 * @code {500} Internal server error
 */
router.post('/token/check', AuthorizationController.checkAuthorization);

module.exports = router;
