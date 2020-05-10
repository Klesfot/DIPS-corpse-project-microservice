/* eslint-disable no-throw-literal */
/* eslint-disable camelcase */

const AdminService = require('../services/admin.service');
const UserModel = require('../models/user.model');


class AdminController {
  constructor({ model }) {
    this.adminService = new AdminService({ UserModel: model });
    this.getUsers = this.getUsers.bind(this);
    this.editUserInfo = this.editUserInfo.bind(this);
    this.editUserPassword = this.editUserPassword.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * User deletion route
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async deleteUser(req, res) {
    try {
      const { user_id } = req.query;
      const result = await this.adminService.deleteUser({ user_id });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }

  /**
   * User password edit route
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async editUserPassword(req, res) {
    try {
      const { user_id, new_password } = req.body;
      const result = await this.adminService.editUserPassword({ user_id, new_password });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }

  /**
   * User info edit route
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async editUserInfo(req, res) {
    try {
      const user = req.body;
      const result = await this.adminService.editUserInfo(user);
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }

  /**
   * User information get route
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async getUsers(req, res) {
    try {
      const { user_id } = req.query;
      const result = await this.adminService.getUsers({ user_id });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }
}
module.exports = new AdminController({ model: UserModel });
