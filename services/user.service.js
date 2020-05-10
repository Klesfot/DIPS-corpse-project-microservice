/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-throw-literal */
const AuthorizationUtils = require('../utils/authorization.utils');
/**
 * User processing service
 */
class AuthorizationService {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  /**
   * User password edit
   * @param {object} data - data of a user to change password
   * @param {string} data.user_id - user id
   * @param {string} data.old_password - old password
   * @param {string} data.new_password - new password
   */
  async editUserPassword({ old_password, new_password, user_id }) {
    if (!old_password || !new_password) throw 'Empty fields';
    const user = await this.UserModel.findById(user_id);
    if (!user) throw { statusCode: 404, message: 'User not found' };
    if (AuthorizationUtils.decrypt(user.password) !== old_password) throw 'Old password does not match';
    await this.UserModel.findByIdAndUpdate(user_id, {
      password: AuthorizationUtils.encrypt(new_password),
    });
    return { message: 'OK' };
  }

  /**
   * User info edit
   * @param {object} data - data of a user to edit info
   * @param {string} data.user_id - user id
   * @param {string} data.first_name - first name
   * @param {string} data.last_name - last name
   * @param {string} data.middle_name - middle name
   * @param {string} data.phone_number - phone number
   * @param {string} data.email - email
   * @param {string} data.passport_serias - passport serial number
   * @param {string} data.passport_number - passport number
   */
  async editUserInfo({ user_id, first_name, last_name, middle_name, email, phone_number, passport_serias, passport_number }) {
    if (!last_name || !middle_name || !first_name || !email || !phone_number || !passport_serias || !passport_number) throw 'Empty fields';
    const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegexp.test(email)) throw 'Incorrect email format';
    const phoneNumberRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!phoneNumberRegexp.test(phone_number)) throw 'Incorrect phone number format';
    await this.UserModel.findByIdAndUpdate(user_id, {
      first_name, last_name, middle_name, email, phone_number, passport_serias, passport_number,
    });
    return { message: 'OK' };
  }

  /**
   * User info get
   * @param {object} data - data of a user to check
   * @param {string} data.user_id - user id
   */
  async getUserInfo({ user_id }) {
    const user = await this.UserModel.findById(user_id);
    if (!user) throw { statusCode: 404, message: 'User not found' };
    return {
      last_name: user.last_name,
      middle_name: user.middle_name,
      first_name: user.first_name,
      email: user.email,
      phone_number: user.phone_number,
      passport_serias: user.passport_serias,
      passport_number: user.passport_number,
    };
  }
}

module.exports = AuthorizationService;
