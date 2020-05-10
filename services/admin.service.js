/* eslint-disable no-return-await */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-throw-literal */
/* eslint-disable max-len */
const AuthorizationUtils = require('../utils/authorization.utils');
/**
 * Service to process admin users
 */
class AdminService {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  /**
   * Delete user
   * @param {object} data - data of a user to delete
   * @param {string} data.user_id - user id
   */
  async deleteUser({ user_id }) {
    await this.UserModel.findByIdAndRemove(user_id);
    return { message: 'OK' };
  }

  /**
   * Get user/s data
   * @param {object} data - data of user/s
   * @param {string} data.user_id - user id
   */
  async getUsers({ user_id }) {
    if (user_id) return await this.UserModel.findById(user_id).select('-password');
    return await this.UserModel.find({}).select('-password');
  }

  /**
    * Get user data
    * @param {object} data - data of a user
    * @param {string} data.user_id - user id
    * @param {string} data.first_name - user first name
    * @param {string} data.last_name - user last name
    * @param {string} data.middle_name - user middle name
    * @param {string} data.phone_number - user phone number
    * @param {string} data.email - user email
    * @param {string} data.passport_serias - user passport serial number
    * @param {string} data.passport_number - user passport number
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
    * User data edit route
    * @param {object} data - data of a user to edit
    * @param {string} data.user_id - user id
    * @param {string} data.new_password - user new password
    */
  async editUserPassword({ user_id, new_password }) {
    if (!new_password) throw 'Empty fields';
    await this.UserModel.findByIdAndUpdate(user_id, {
      password: AuthorizationUtils.encrypt(new_password),
    });
    return { message: 'OK' };
  }
}

module.exports = AdminService;
