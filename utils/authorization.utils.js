/* eslint-disable class-methods-use-this */
const crypto = require('crypto');

class AuthorizationUtils {
  /**
   * Password encryption using crypto
   * @param {string} password - password to encrypt
   */
  encrypt(password) {
    const cipher = crypto.createCipher('aes-128-cbc', process.env.SECRET_KEY);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    return encryptedPassword;
  }

  /**
   * Password decryption using crypto
   * @param {string} encryptedPassword - password to decrypt
   */
  decrypt(encryptedPassword) {
    const decipher = crypto.createDecipher('aes-128-cbc', process.env.SECRET_KEY);
    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
    decryptedPassword += decipher.final('utf8');
    return decryptedPassword;
  }
}
module.exports = new AuthorizationUtils();
