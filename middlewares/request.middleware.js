/* eslint-disable no-param-reassign */
/**
 * Additional sending methods
 * @return {function}
 */
module.exports = (req, res, next) => {
  /**
     * Responds with error from param
     * @param {object} err - Object which contains errpor info, i.e. {statusCode: 500, message: err}
     */
  res.sendErr = (err) => {
    const statusCode = err.statusCode || 500;
    const message = (typeof err === 'string') ? err : err.message.toString() || 'An error has occured';
    if (typeof err === 'object') {
      delete err.statusCode;
      delete err.message;
    }
    return res.status(statusCode).json({ message, stack: err.stack });
  };
  /**
     * Sends data to client
     * @param {any} data - Payload
     */
  res.sendRes = (data) => res.send(data);

  return next();
};
