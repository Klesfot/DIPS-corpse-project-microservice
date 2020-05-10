/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-throw-literal */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const AuthorizationUtils = require('../utils/authorization.utils');
/**
 * Auth service
 */
class AuthorizationService {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  /**
   * Register new user
   * @param {object} data - data of a user to register
   * @param {string} data.first_name - user name
   * @param {string} data.password - password
   * @param {string} data.middle_name - middle name
   * @param {string} data.last_name - last name
   * @param {string} data.phone_number - phone number
   * @param {string} data.email - email
   * @param {string} data.passport_serias - passport serial number
   * @param {string} data.passport_number - passport number
   * @returns {Promise<Object>}
   */
  async signUp({ last_name, first_name, middle_name, password, email, phone_number, passport_number, passport_serias }) {
    if (!last_name || !middle_name || !first_name || !email || !phone_number || !password || !passport_number || !passport_serias) throw 'Empty fields';
    const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegexp.test(email)) throw 'Incorrect email format';
    const phoneNumberRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!phoneNumberRegexp.test(phone_number)) throw 'Incorrect phone number format';
    const user = new this.UserModel({
      last_name, first_name, middle_name, password: AuthorizationUtils.encrypt(password), email, phone_number, passport_number, passport_serias,
    });
    await user.save();
    return { message: 'OK' };
  }

  /**
   * user login and token assign
   * @param {object} data - data of a user to login
   * @param {string} data.email - user email
   * @param {string} data.password - password
   */
  async login({ email, password }) {
    const user = await this.UserModel.findOne({ email });
    if (!user) throw { message: 'User not found', statusCode: 404 };
    if (password !== AuthorizationUtils.decrypt(user.password)) throw { message: 'Incorrect password' };
    const token = jwt.sign({ user_id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '3h' });
    return {
      user_id: user.id,
      token,
    };
  }

  /**
   * User auth check
   * @param {object} data - data of a user to check auth
   * @param {string} data.token - auth token
   */
  async checkAuthorization({ token }) {
    const userInfo = jwt.verify(token, process.env.SECRET_KEY);
    return { user_id: userInfo.user_id, isAdmin: userInfo.isAdmin };
  }
}

module.exports = AuthorizationService;
